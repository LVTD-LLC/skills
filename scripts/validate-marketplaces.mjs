import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { loadSkills, metadataForSkill, root } from "./skill-utils.mjs";

const MARKETPLACE_NAME = "lvtd-skills";
const marketplaceDir = path.join(root, "dist", "marketplace");

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
    errors.push(`${label} must be ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
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

const errors = [];
const skills = await loadSkills();
const marketplaceVersion = skills
  .map((skill) => metadataForSkill(skill).version)
  .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))
  .at(-1);
const claudeMarketplacePath = path.join(marketplaceDir, ".claude-plugin", "marketplace.json");
const codexMarketplacePath = path.join(marketplaceDir, ".agents", "plugins", "marketplace.json");
const claudeMarketplace = await readJson(claudeMarketplacePath, errors);
const codexMarketplace = await readJson(codexMarketplacePath, errors);

if (claudeMarketplace) {
  assertEqual(claudeMarketplace.name, MARKETPLACE_NAME, "Claude marketplace name", errors);
  assertEqual(claudeMarketplace.version, marketplaceVersion, "Claude marketplace version", errors);
}

if (codexMarketplace) {
  assertEqual(codexMarketplace.name, MARKETPLACE_NAME, "Codex marketplace name", errors);
  assertEqual(
    codexMarketplace.interface?.displayName,
    "LVTD Skills",
    "Codex marketplace displayName",
    errors,
  );
}

const claudeEntries = claudeMarketplace ? assertArray(claudeMarketplace.plugins, "Claude marketplace plugins", errors) : [];
const codexEntries = codexMarketplace ? assertArray(codexMarketplace.plugins, "Codex marketplace plugins", errors) : [];

assertEqual(claudeEntries.length, skills.length, "Claude marketplace plugin count", errors);
assertEqual(codexEntries.length, skills.length, "Codex marketplace plugin count", errors);

for (const skill of skills) {
  const metadata = metadataForSkill(skill);
  const pluginName = `lvtd-${skill.name}`;
  const pluginDir = path.join(marketplaceDir, "plugins", pluginName);
  const copiedSkillPath = path.join(pluginDir, "skills", skill.name, "SKILL.md");
  const claudeManifestPath = path.join(pluginDir, ".claude-plugin", "plugin.json");
  const codexManifestPath = path.join(pluginDir, ".codex-plugin", "plugin.json");

  if (!(await pathExists(copiedSkillPath))) {
    errors.push(`${pluginName} must include copied skill ${skill.name}`);
  }

  const claudeEntry = findEntry(claudeEntries, pluginName, "Claude marketplace", errors);
  if (claudeEntry) {
    assertEqual(claudeEntry.source, `./plugins/${pluginName}`, `${pluginName} Claude source`, errors);
    assertEqual(claudeEntry.category, metadata.category, `${pluginName} Claude category`, errors);
  }

  const codexEntry = findEntry(codexEntries, pluginName, "Codex marketplace", errors);
  if (codexEntry) {
    assertEqual(codexEntry.source?.source, "local", `${pluginName} Codex source type`, errors);
    assertEqual(codexEntry.source?.path, `./plugins/${pluginName}`, `${pluginName} Codex source path`, errors);
    assertEqual(codexEntry.policy?.installation, "AVAILABLE", `${pluginName} Codex installation policy`, errors);
    assertEqual(codexEntry.policy?.authentication, "ON_USE", `${pluginName} Codex authentication policy`, errors);
    assertEqual(codexEntry.category, metadata.category, `${pluginName} Codex category`, errors);
  }

  const claudeManifest = await readJson(claudeManifestPath, errors);
  if (claudeManifest) {
    assertEqual(claudeManifest.name, pluginName, `${pluginName} Claude manifest name`, errors);
    assertEqual(claudeManifest.version, metadata.version, `${pluginName} Claude manifest version`, errors);
    assertEqual(claudeManifest.skills, "./skills/", `${pluginName} Claude skills path`, errors);
    assertEqual(claudeManifest.displayName, `LVTD ${metadata.displayName}`, `${pluginName} Claude displayName`, errors);
  }

  const codexManifest = await readJson(codexManifestPath, errors);
  if (codexManifest) {
    assertEqual(codexManifest.name, pluginName, `${pluginName} Codex manifest name`, errors);
    assertEqual(codexManifest.version, metadata.version, `${pluginName} Codex manifest version`, errors);
    assertEqual(codexManifest.skills, "./skills/", `${pluginName} Codex skills path`, errors);
    assertEqual(
      codexManifest.interface?.displayName,
      `LVTD ${metadata.displayName}`,
      `${pluginName} Codex displayName`,
      errors,
    );
    assertEqual(
      codexManifest.interface?.category,
      metadata.category,
      `${pluginName} Codex interface category`,
      errors,
    );
    assertDeepEqual(
      codexManifest.interface?.capabilities,
      ["Interactive", "Read"],
      `${pluginName} Codex capabilities`,
      errors,
    );
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Validated generated marketplaces for ${skills.length} skills`);
