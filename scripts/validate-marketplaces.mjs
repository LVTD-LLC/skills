import { lstat, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import {
  loadSkills,
  MARKETPLACE_DISPLAY_NAME,
  MARKETPLACE_NAME,
  root,
} from "./skill-utils.mjs";
import {
  APP_ICON_PATH,
  claudeManifestForPlugin,
  claudeMarketplaceForSkills,
  codexManifestForPlugin,
  codexMarketplaceForSkills,
  marketplacePluginsForSkills,
  pluginIconPath,
} from "./marketplace-utils.mjs";
const marketplaceDir = root;

async function pathExists(filePath) {
  try {
    await lstat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readJson(filePath, errors) {
  try {
    return JSON.parse(await readFile(filePath, "utf8"));
  } catch (error) {
    errors.push(`${filePath} must be readable JSON: ${error.message}`);
    return null;
  }
}

function assertEqual(actual, expected, label, errors) {
  if (actual !== expected) {
    errors.push(`${label} must be ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

function assertDeepEqual(actual, expected, label, errors) {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) {
    errors.push(`${label} must match generated output; run npm run build`);
    return false;
  }
  return true;
}

function assertArray(value, label, errors) {
  if (!Array.isArray(value)) {
    errors.push(`${label} must be an array`);
    return [];
  }
  return value;
}

function findEntry(entries, name, label, errors) {
  const entry = entries.find((candidate) => candidate?.name === name);
  if (!entry) {
    errors.push(`${label} is missing ${name}`);
  }
  return entry;
}

async function listPluginDirectories(pluginsDir, errors) {
  try {
    const entries = await readdir(pluginsDir, { withFileTypes: true });
    return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  } catch (error) {
    errors.push(`${pluginsDir} must be readable: ${error.message}`);
    return [];
  }
}

async function listDirectoryEntryNames(directory, label, errors) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    return entries.map((entry) => entry.name).sort();
  } catch (error) {
    errors.push(`${label} must be readable: ${error.message}`);
    return [];
  }
}

async function assertSkillCopyFromSource(skill, copiedSkillPath, pluginName, errors) {
  if (!(await pathExists(copiedSkillPath))) {
    errors.push(`${pluginName} must include copied skill ${skill.name} from ${skill.relativePath}`);
    return;
  }

  let entryStat;
  try {
    entryStat = await lstat(copiedSkillPath);
  } catch (error) {
    errors.push(`${pluginName} skill copy ${copiedSkillPath} must be readable: ${error.message}`);
    return;
  }

  if (entryStat.isSymbolicLink()) {
    errors.push(
      `${pluginName} skill ${skill.name} must be a directory copy, not a symlink; run npm run build`,
    );
    return;
  }

  if (!entryStat.isDirectory()) {
    errors.push(
      `${pluginName} skill ${skill.name} must be a directory copy of ${skill.relativePath}; run npm run build`,
    );
    return;
  }

  const sourceSkillFile = path.join(skill.path, "SKILL.md");
  const copiedSkillFile = path.join(copiedSkillPath, "SKILL.md");

  if (!(await pathExists(copiedSkillFile))) {
    errors.push(`${pluginName} skill ${skill.name} must include SKILL.md; run npm run build`);
    return;
  }

  const [sourceContent, copiedContent] = await Promise.all([
    readFile(sourceSkillFile, "utf8"),
    readFile(copiedSkillFile, "utf8"),
  ]);

  if (copiedContent !== sourceContent) {
    errors.push(
      `${pluginName} skill ${skill.name} SKILL.md must match ${skill.relativePath}; run npm run build`,
    );
  }
}

async function assertAppIconExists(baseDir, label, errors) {
  await assertAssetExists(baseDir, APP_ICON_PATH, label, errors);
}

async function assertAssetExists(baseDir, relativeAssetPath, label, errors) {
  const iconPath = path.join(baseDir, relativeAssetPath.replace(/^\.\//, ""));

  if (!(await pathExists(iconPath))) {
    errors.push(`${label} must include ${relativeAssetPath}; run npm run build`);
  }
}

const errors = [];
const skills = await loadSkills();
const claudeMarketplacePath = path.join(marketplaceDir, ".claude-plugin", "marketplace.json");
const codexMarketplacePath = path.join(marketplaceDir, ".agents", "plugins", "marketplace.json");
const claudeMarketplace = await readJson(claudeMarketplacePath, errors);
const codexMarketplace = await readJson(codexMarketplacePath, errors);
const plugins = marketplacePluginsForSkills(skills);
const expectedPluginNames = plugins.map((plugin) => plugin.name).sort();
const expectedClaudeMarketplace = claudeMarketplaceForSkills(skills, plugins);
const expectedCodexMarketplace = codexMarketplaceForSkills(skills, plugins);
let claudeMarketplaceMatches = false;
let codexMarketplaceMatches = false;

if (claudeMarketplace) {
  claudeMarketplaceMatches = assertDeepEqual(
    claudeMarketplace,
    expectedClaudeMarketplace,
    "Claude marketplace",
    errors,
  );
  if (claudeMarketplaceMatches) {
    assertEqual(claudeMarketplace.name, MARKETPLACE_NAME, "Claude marketplace name", errors);
  }
}

if (codexMarketplace) {
  codexMarketplaceMatches = assertDeepEqual(
    codexMarketplace,
    expectedCodexMarketplace,
    "Codex marketplace",
    errors,
  );
  if (codexMarketplaceMatches) {
    assertEqual(codexMarketplace.name, MARKETPLACE_NAME, "Codex marketplace name", errors);
    assertEqual(
      codexMarketplace.interface?.displayName,
      MARKETPLACE_DISPLAY_NAME,
      "Codex marketplace displayName",
      errors,
    );
    assertEqual(
      codexMarketplace.interface?.logo,
      APP_ICON_PATH,
      "Codex marketplace logo",
      errors,
    );
  }
}

await assertAppIconExists(path.join(marketplaceDir, ".agents", "plugins"), "Codex marketplace", errors);

const pluginDirs = await listPluginDirectories(path.join(marketplaceDir, "plugins"), errors);
assertDeepEqual(pluginDirs, expectedPluginNames, "Generated plugin directory list", errors);
const claudeEntries = claudeMarketplaceMatches
  ? assertArray(claudeMarketplace.plugins, "Claude marketplace plugins", errors)
  : [];
const codexEntries = codexMarketplaceMatches
  ? assertArray(codexMarketplace.plugins, "Codex marketplace plugins", errors)
  : [];

for (const plugin of plugins) {
  const pluginName = plugin.name;
  const pluginDir = path.join(marketplaceDir, "plugins", pluginName);
  const pluginSkillsDir = path.join(pluginDir, "skills");
  const claudeManifestPath = path.join(pluginDir, ".claude-plugin", "plugin.json");
  const codexManifestPath = path.join(pluginDir, ".codex-plugin", "plugin.json");
  const expectedClaudeManifest = claudeManifestForPlugin(plugin);
  const expectedCodexManifest = codexManifestForPlugin(plugin);
  const expectedSkillEntries = plugin.skills.map((skill) => skill.name).sort();
  const expectedPluginIconPath = pluginIconPath(plugin);

  const pluginSkillEntries = await listDirectoryEntryNames(
    pluginSkillsDir,
    `${pluginName} skills directory`,
    errors,
  );
  assertDeepEqual(pluginSkillEntries, expectedSkillEntries, `${pluginName} skills directory`, errors);

  for (const skill of plugin.skills) {
    await assertSkillCopyFromSource(skill, path.join(pluginSkillsDir, skill.name), pluginName, errors);
  }

  await assertAssetExists(pluginDir, expectedPluginIconPath, pluginName, errors);

  if (claudeMarketplaceMatches) {
    const claudeEntry = findEntry(claudeEntries, pluginName, "Claude marketplace", errors);
    if (claudeEntry) {
      assertEqual(claudeEntry.source, `./plugins/${pluginName}`, `${pluginName} Claude source`, errors);
      assertEqual(claudeEntry.category, plugin.category, `${pluginName} Claude category`, errors);
    }
  }

  if (codexMarketplaceMatches) {
    const codexEntry = findEntry(codexEntries, pluginName, "Codex marketplace", errors);
    if (codexEntry) {
      assertEqual(codexEntry.source?.source, "local", `${pluginName} Codex source type`, errors);
      assertEqual(
        codexEntry.source?.path,
        `./plugins/${pluginName}`,
        `${pluginName} Codex source path`,
        errors,
      );
      assertEqual(codexEntry.category, plugin.category, `${pluginName} Codex category`, errors);
    }
  }

  const claudeManifest = await readJson(claudeManifestPath, errors);
  if (claudeManifest) {
    const claudeManifestMatches = assertDeepEqual(
      claudeManifest,
      expectedClaudeManifest,
      `${pluginName} Claude manifest`,
      errors,
    );
    if (claudeManifestMatches) {
      assertEqual(claudeManifest.name, pluginName, `${pluginName} Claude manifest name`, errors);
      assertEqual(
        claudeManifest.version,
        expectedClaudeManifest.version,
        `${pluginName} Claude manifest version`,
        errors,
      );
      assertEqual(claudeManifest.skills, "./skills/", `${pluginName} Claude skills path`, errors);
    }
  }

  const codexManifest = await readJson(codexManifestPath, errors);
  if (codexManifest) {
    const codexManifestMatches = assertDeepEqual(
      codexManifest,
      expectedCodexManifest,
      `${pluginName} Codex manifest`,
      errors,
    );
    if (codexManifestMatches) {
      assertEqual(codexManifest.name, pluginName, `${pluginName} Codex manifest name`, errors);
      assertEqual(
        codexManifest.version,
        expectedCodexManifest.version,
        `${pluginName} Codex manifest version`,
        errors,
      );
      assertEqual(codexManifest.skills, "./skills/", `${pluginName} Codex skills path`, errors);
      assertEqual(
        codexManifest.interface?.category,
        plugin.category,
        `${pluginName} Codex interface category`,
        errors,
      );
      assertEqual(
        codexManifest.interface?.logo,
        expectedPluginIconPath,
        `${pluginName} Codex logo`,
        errors,
      );
      assertEqual(
        codexManifest.interface?.composerIcon,
        expectedPluginIconPath,
        `${pluginName} Codex composerIcon`,
        errors,
      );
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(
  `Validated generated marketplaces for ${plugins.length} plugins containing ${plugins.flatMap((plugin) => plugin.skills).length} skills`,
);
