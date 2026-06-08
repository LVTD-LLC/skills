import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import {
  loadSkills,
  listFilesRecursive,
  MARKETPLACE_DISPLAY_NAME,
  MARKETPLACE_NAME,
  root,
} from "./skill-utils.mjs";
import {
  claudeManifestForSkill,
  claudeMarketplaceEntryForSkill,
  claudeMarketplaceForSkills,
  codexManifestForSkill,
  codexMarketplaceEntryForSkill,
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
  }
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

assertEqual(expectedClaudeMarketplace.name, MARKETPLACE_NAME, "Generated Claude marketplace name", errors);
assertEqual(expectedCodexMarketplace.name, MARKETPLACE_NAME, "Generated Codex marketplace name", errors);
assertEqual(
  expectedCodexMarketplace.interface?.displayName,
  MARKETPLACE_DISPLAY_NAME,
  "Generated Codex marketplace displayName",
  errors,
);

if (claudeMarketplace) {
  assertDeepEqual(claudeMarketplace, expectedClaudeMarketplace, "Claude marketplace", errors);
}

if (codexMarketplace) {
  assertDeepEqual(codexMarketplace, expectedCodexMarketplace, "Codex marketplace", errors);
}

const pluginDirs = await listPluginDirectories(path.join(marketplaceDir, "plugins"), errors);
assertDeepEqual(pluginDirs, expectedPluginNames, "Generated plugin directory list", errors);

for (const skill of skills) {
  const pluginName = pluginNameForSkill(skill.name);
  const pluginDir = path.join(marketplaceDir, "plugins", pluginName);
  const copiedSkillDir = path.join(pluginDir, "skills", skill.name);
  const claudeManifestPath = path.join(pluginDir, ".claude-plugin", "plugin.json");
  const codexManifestPath = path.join(pluginDir, ".codex-plugin", "plugin.json");
  const expectedClaudeEntry = claudeMarketplaceEntryForSkill(skill);
  const expectedCodexEntry = codexMarketplaceEntryForSkill(skill);
  const expectedClaudeManifest = claudeManifestForSkill(skill);
  const expectedCodexManifest = codexManifestForSkill(skill);

  await assertCopiedSkillMatchesSource(skill, copiedSkillDir, pluginName, errors);

  assertEqual(expectedClaudeEntry.source, `./plugins/${pluginName}`, `${pluginName} Claude source`, errors);
  assertEqual(expectedCodexEntry.source?.source, "local", `${pluginName} Codex source type`, errors);
  assertEqual(
    expectedCodexEntry.source?.path,
    `./plugins/${pluginName}`,
    `${pluginName} Codex source path`,
    errors,
  );

  const claudeManifest = await readJson(claudeManifestPath, errors);
  if (claudeManifest) {
    assertEqual(
      expectedClaudeManifest.name,
      pluginName,
      `${pluginName} generated Claude manifest name`,
      errors,
    );
    assertEqual(
      expectedClaudeManifest.skills,
      "./skills/",
      `${pluginName} generated Claude skills path`,
      errors,
    );
    assertDeepEqual(
      claudeManifest,
      expectedClaudeManifest,
      `${pluginName} Claude manifest`,
      errors,
    );
  }

  const codexManifest = await readJson(codexManifestPath, errors);
  if (codexManifest) {
    assertEqual(
      expectedCodexManifest.name,
      pluginName,
      `${pluginName} generated Codex manifest name`,
      errors,
    );
    assertEqual(
      expectedCodexManifest.skills,
      "./skills/",
      `${pluginName} generated Codex skills path`,
      errors,
    );
    assertDeepEqual(
      codexManifest,
      expectedCodexManifest,
      `${pluginName} Codex manifest`,
      errors,
    );
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated generated marketplaces for ${skills.length} skills`);
