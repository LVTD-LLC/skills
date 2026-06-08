import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadSkills, metadataForSkill, root } from "./skill-utils.mjs";
import { validateSkills } from "./validate-skills.mjs";

const MARKETPLACE_NAME = "lvtd-skills";
const MARKETPLACE_DISPLAY_NAME = "LVTD Skills";
const REPOSITORY_URL = "https://github.com/LVTD-LLC/skills";
const AUTHOR = {
  name: "LVTD",
  url: "https://github.com/LVTD-LLC",
};

const distDir = path.join(root, "dist");
const marketplaceDir = path.join(distDir, "marketplace");
const pluginsDir = path.join(marketplaceDir, "plugins");

function pluginNameForSkill(skillName) {
  return `lvtd-${skillName}`;
}

function buildDefaultPrompt(skill, pluginName) {
  return `Use $${pluginName}:${skill.name} when working on ${skill.name.replaceAll("-", " ")} tasks.`;
}

function buildLongDescription(skill, metadata) {
  return `${skill.fields.description} Packaged as an LVTD marketplace skill for Codex and Claude Code. Category: ${metadata.category}.`;
}

function buildShortDescription(skill, metadata) {
  const description = skill.fields.description.replace(/\s+/g, " ").trim();
  if (description.length <= 128) {
    return description;
  }
  return `${metadata.displayName} workflow guidance for ${metadata.category.toLowerCase()}.`;
}

async function writeJson(filePath, payload) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

function validateMarketplaceShape({ claudeMarketplace, codexMarketplace, pluginNames }) {
  const errors = [];

  if (claudeMarketplace.name !== MARKETPLACE_NAME) {
    errors.push("Claude marketplace name is invalid");
  }

  if (!Array.isArray(claudeMarketplace.plugins)) {
    errors.push("Claude marketplace plugins must be an array");
  }

  if (codexMarketplace.name !== MARKETPLACE_NAME) {
    errors.push("Codex marketplace name is invalid");
  }

  if (!Array.isArray(codexMarketplace.plugins)) {
    errors.push("Codex marketplace plugins must be an array");
  }

  for (const pluginName of pluginNames) {
    const claudeEntry = claudeMarketplace.plugins.find((entry) => entry.name === pluginName);
    if (!claudeEntry) {
      errors.push(`Claude marketplace is missing ${pluginName}`);
    } else if (claudeEntry.source !== `./plugins/${pluginName}`) {
      errors.push(`Claude marketplace source is invalid for ${pluginName}`);
    }

    const codexEntry = codexMarketplace.plugins.find((entry) => entry.name === pluginName);
    if (!codexEntry) {
      errors.push(`Codex marketplace is missing ${pluginName}`);
    } else if (codexEntry.source?.path !== `./plugins/${pluginName}`) {
      errors.push(`Codex marketplace source path is invalid for ${pluginName}`);
    }
  }

  return errors;
}

const { errors } = await validateSkills();
if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const skills = await loadSkills();
const pluginNames = [];
const claudePlugins = [];
const codexPlugins = [];

await rm(marketplaceDir, { recursive: true, force: true });
await mkdir(pluginsDir, { recursive: true });

for (const skill of skills) {
  const metadata = metadataForSkill(skill);
  const pluginName = pluginNameForSkill(skill.name);
  const pluginDir = path.join(pluginsDir, pluginName);
  const skillDestination = path.join(pluginDir, "skills", skill.name);
  const shortDescription = buildShortDescription(skill, metadata);
  const longDescription = buildLongDescription(skill, metadata);
  const keywords = [...new Set([skill.name, ...metadata.tags])];

  pluginNames.push(pluginName);
  await mkdir(path.join(pluginDir, ".claude-plugin"), { recursive: true });
  await mkdir(path.join(pluginDir, ".codex-plugin"), { recursive: true });
  await cp(skill.path, skillDestination, { recursive: true });

  const commonManifest = {
    name: pluginName,
    version: metadata.version,
    description: shortDescription,
    author: AUTHOR,
    homepage: REPOSITORY_URL,
    repository: REPOSITORY_URL,
    license: metadata.license,
    keywords,
    skills: "./skills/",
  };

  await writeJson(path.join(pluginDir, ".claude-plugin", "plugin.json"), {
    ...commonManifest,
    displayName: `LVTD ${metadata.displayName}`,
  });

  await writeJson(path.join(pluginDir, ".codex-plugin", "plugin.json"), {
    ...commonManifest,
    interface: {
      displayName: `LVTD ${metadata.displayName}`,
      shortDescription,
      longDescription,
      developerName: "LVTD",
      category: metadata.category,
      capabilities: ["Interactive", "Read", "Write"],
      websiteURL: REPOSITORY_URL,
      defaultPrompt: [buildDefaultPrompt(skill, pluginName)],
      screenshots: [],
    },
  });

  claudePlugins.push({
    name: pluginName,
    displayName: `LVTD ${metadata.displayName}`,
    source: `./plugins/${pluginName}`,
    description: shortDescription,
    author: {
      name: AUTHOR.name,
    },
    homepage: REPOSITORY_URL,
    repository: REPOSITORY_URL,
    license: metadata.license,
    category: metadata.category,
    tags: metadata.tags,
    keywords,
  });

  codexPlugins.push({
    name: pluginName,
    source: {
      source: "local",
      path: `./plugins/${pluginName}`,
    },
    policy: {
      installation: "AVAILABLE",
      authentication: "ON_INSTALL",
    },
    category: metadata.category,
  });
}

const claudeMarketplace = {
  name: MARKETPLACE_NAME,
  owner: {
    name: AUTHOR.name,
  },
  description: "LVTD's portable Agent Skills packaged for Claude Code.",
  version: "0.1.0",
  plugins: claudePlugins,
};

const codexMarketplace = {
  name: MARKETPLACE_NAME,
  interface: {
    displayName: MARKETPLACE_DISPLAY_NAME,
  },
  plugins: codexPlugins,
};

const marketplaceErrors = validateMarketplaceShape({
  claudeMarketplace,
  codexMarketplace,
  pluginNames,
});

if (marketplaceErrors.length > 0) {
  console.error(marketplaceErrors.join("\n"));
  process.exit(1);
}

await writeJson(path.join(marketplaceDir, ".claude-plugin", "marketplace.json"), claudeMarketplace);
await writeJson(
  path.join(marketplaceDir, ".agents", "plugins", "marketplace.json"),
  codexMarketplace,
);

console.log(`Wrote ${MARKETPLACE_NAME} marketplace with ${pluginNames.length} plugins`);
