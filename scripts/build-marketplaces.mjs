import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadSkills, marketplaceVersionForSkills, metadataForSkill, root } from "./skill-utils.mjs";
import { validateSkills } from "./validate-skills.mjs";

const MARKETPLACE_NAME = "lvtd-skills";
const MARKETPLACE_DISPLAY_NAME = "LVTD Skills";
const REPOSITORY_URL = "https://github.com/LVTD-LLC/skills";
const AUTHOR = {
  name: "LVTD",
  url: "https://github.com/LVTD-LLC",
};

const marketplaceDir = root;
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

if (!process.argv.includes("--skip-validation")) {
  const { errors } = await validateSkills();
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
}

const skills = await loadSkills();
const marketplaceVersion = marketplaceVersionForSkills(skills);
const claudePlugins = [];
const codexPlugins = [];

await rm(path.join(marketplaceDir, ".claude-plugin"), { recursive: true, force: true });
await rm(path.join(marketplaceDir, ".agents"), { recursive: true, force: true });
await rm(pluginsDir, { recursive: true, force: true });
await mkdir(pluginsDir, { recursive: true });

for (const skill of skills) {
  const metadata = metadataForSkill(skill);
  const pluginName = pluginNameForSkill(skill.name);
  const pluginDir = path.join(pluginsDir, pluginName);
  const skillDestination = path.join(pluginDir, "skills", skill.name);
  const shortDescription = buildShortDescription(skill, metadata);
  const longDescription = buildLongDescription(skill, metadata);
  const keywords = [...new Set([skill.name, ...metadata.tags])];

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
      capabilities: ["Interactive", "Read"],
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
      authentication: "ON_USE",
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
  version: marketplaceVersion,
  plugins: claudePlugins,
};

const codexMarketplace = {
  name: MARKETPLACE_NAME,
  interface: {
    displayName: MARKETPLACE_DISPLAY_NAME,
  },
  plugins: codexPlugins,
};

await writeJson(path.join(marketplaceDir, ".claude-plugin", "marketplace.json"), claudeMarketplace);
await writeJson(
  path.join(marketplaceDir, ".agents", "plugins", "marketplace.json"),
  codexMarketplace,
);

console.log(`Wrote ${MARKETPLACE_NAME} marketplace with ${skills.length} plugins`);
