import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import {
  loadSkills,
  listFilesRecursive,
  MARKETPLACE_DISPLAY_NAME,
  MARKETPLACE_NAME,
  metadataForSkill,
  root,
} from "./skill-utils.mjs";
import {
  claudeManifestForSkill,
  claudeMarketplaceForSkills,
  codexManifestForSkill,
  codexMarketplaceForSkills,
  pluginNameForSkill,
} from "./marketplace-utils.mjs";
const marketplaceDir = root;

async function pathExists(filePath) {
  try {
    await stat(filePath);
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

async function assertCopiedSkillMatchesSource(skill, copiedSkillPath, pluginName, errors) {
  if (!(await pathExists(copiedSkillPath))) {
    errors.push(`${pluginName} must include copied skill ${skill.name}`);
    return;
  }

  const sourceFiles = await listFilesRecursive(skill.path);
  const copiedFiles = await listFilesRecursive(copiedSkillPath);
  if (JSON.stringify(copiedFiles) !== JSON.stringify(sourceFiles)) {
    errors.push(`${pluginName} copied skill file list must match source; run npm run build`);
    return;
  }

  for (const file of sourceFiles) {
    const sourceContent = await readFile(path.join(skill.path, file));
    const copiedContent = await readFile(path.join(copiedSkillPath, file));

    if (!sourceContent.equals(copiedContent)) {
      errors.push(`${pluginName} copied skill file ${file} must match source; run npm run build`);
    }
  }
}

const errors = [];
const skills = await loadSkills();
const claudeMarketplacePath = path.join(marketplaceDir, ".claude-plugin", "marketplace.json");
const codexMarketplacePath = path.join(marketplaceDir, ".agents", "plugins", "marketplace.json");
const claudeMarketplace = await readJson(claudeMarketplacePath, errors);
const codexMarketplace = await readJson(codexMarketplacePath, errors);
const expectedPluginNames = skills.map((skill) => pluginNameForSkill(skill.name));
const expectedClaudeMarketplace = claudeMarketplaceForSkills(skills);
const expectedCodexMarketplace = codexMarketplaceForSkills(skills);
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
  }
}

const pluginDirs = await listPluginDirectories(path.join(marketplaceDir, "plugins"), errors);
assertDeepEqual(pluginDirs, expectedPluginNames, "Generated plugin directory list", errors);
const claudeEntries = claudeMarketplaceMatches
  ? assertArray(claudeMarketplace.plugins, "Claude marketplace plugins", errors)
  : [];
const codexEntries = codexMarketplaceMatches
  ? assertArray(codexMarketplace.plugins, "Codex marketplace plugins", errors)
  : [];

for (const skill of skills) {
  const metadata = metadataForSkill(skill);
  const pluginName = pluginNameForSkill(skill.name);
  const pluginDir = path.join(marketplaceDir, "plugins", pluginName);
  const copiedSkillDir = path.join(pluginDir, "skills", skill.name);
  const claudeManifestPath = path.join(pluginDir, ".claude-plugin", "plugin.json");
  const codexManifestPath = path.join(pluginDir, ".codex-plugin", "plugin.json");
  const expectedClaudeManifest = claudeManifestForSkill(skill);
  const expectedCodexManifest = codexManifestForSkill(skill);

  await assertCopiedSkillMatchesSource(skill, copiedSkillDir, pluginName, errors);

  if (claudeMarketplaceMatches) {
    const claudeEntry = findEntry(claudeEntries, pluginName, "Claude marketplace", errors);
    if (claudeEntry) {
      assertEqual(claudeEntry.source, `./plugins/${pluginName}`, `${pluginName} Claude source`, errors);
      assertEqual(claudeEntry.category, metadata.category, `${pluginName} Claude category`, errors);
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
      assertEqual(codexEntry.category, metadata.category, `${pluginName} Codex category`, errors);
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
        metadata.version,
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
        metadata.version,
        `${pluginName} Codex manifest version`,
        errors,
      );
      assertEqual(codexManifest.skills, "./skills/", `${pluginName} Codex skills path`, errors);
      assertEqual(
        codexManifest.interface?.category,
        metadata.category,
        `${pluginName} Codex interface category`,
        errors,
      );
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated generated marketplaces for ${skills.length} skills`);
