import {
  MARKETPLACE_DISPLAY_NAME,
  MARKETPLACE_NAME,
  marketplaceVersionForSkills,
  metadataForSkill,
} from "./skill-utils.mjs";

export const REPOSITORY_URL = "https://github.com/LVTD-LLC/skills";
export const BRAND_COLOR = "#FF4057";
export const ASSET_DIR = "assets";
export const APP_ICON_FILE = "app-icon.png";
export const APP_ICON_PATH = `./${ASSET_DIR}/${APP_ICON_FILE}`;
export const AUTHOR = {
  name: "LVTD",
  url: "https://github.com/LVTD-LLC",
};

export function pluginNameForSkill(skillName) {
  return skillName;
}

export function buildDefaultPrompt(skill, metadata = metadataForSkill(skill)) {
  return `Use the ${metadata.displayName} skill when working on ${skill.name.replaceAll("-", " ")} tasks.`;
}

export function buildLongDescription(skill, metadata = metadataForSkill(skill)) {
  return `${skill.fields.description} Packaged as a marketplace skill for Codex and Claude Code. Category: ${metadata.category}.`;
}

export function buildShortDescription(skill, metadata = metadataForSkill(skill)) {
  const description = skill.fields.description.replace(/\s+/g, " ").trim();
  if (description.length <= 128) {
    return description;
  }

  return `${metadata.displayName} workflow guidance for ${metadata.category}.`;
}

export function keywordsForSkill(skill, metadata = metadataForSkill(skill)) {
  return [...new Set([skill.name, ...metadata.tags])];
}

export function commonManifestForSkill(skill, metadata = metadataForSkill(skill)) {
  return {
    name: pluginNameForSkill(skill.name),
    version: metadata.version,
    description: buildShortDescription(skill, metadata),
    author: AUTHOR,
    homepage: REPOSITORY_URL,
    repository: REPOSITORY_URL,
    license: metadata.license,
    keywords: keywordsForSkill(skill, metadata),
    skills: "./skills/",
  };
}

export function claudeManifestForSkill(skill, metadata = metadataForSkill(skill)) {
  return {
    ...commonManifestForSkill(skill, metadata),
    displayName: metadata.displayName,
  };
}

export function codexManifestForSkill(skill, metadata = metadataForSkill(skill)) {
  const shortDescription = buildShortDescription(skill, metadata);

  return {
    ...commonManifestForSkill(skill, metadata),
    interface: {
      displayName: metadata.displayName,
      shortDescription,
      longDescription: buildLongDescription(skill, metadata),
      developerName: "LVTD",
      category: metadata.category,
      capabilities: ["Interactive", "Read"],
      websiteURL: REPOSITORY_URL,
      defaultPrompt: [buildDefaultPrompt(skill, metadata)],
      brandColor: BRAND_COLOR,
      composerIcon: APP_ICON_PATH,
      logo: APP_ICON_PATH,
      screenshots: [],
    },
  };
}

export function claudeMarketplaceEntryForSkill(skill, metadata = metadataForSkill(skill)) {
  const pluginName = pluginNameForSkill(skill.name);

  return {
    name: pluginName,
    displayName: metadata.displayName,
    source: `./plugins/${pluginName}`,
    description: buildShortDescription(skill, metadata),
    author: {
      name: AUTHOR.name,
    },
    homepage: REPOSITORY_URL,
    repository: REPOSITORY_URL,
    license: metadata.license,
    category: metadata.category,
    tags: metadata.tags,
    keywords: keywordsForSkill(skill, metadata),
  };
}

export function codexMarketplaceEntryForSkill(skill, metadata = metadataForSkill(skill)) {
  const pluginName = pluginNameForSkill(skill.name);

  return {
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
  };
}

export function claudeMarketplaceForSkills(skills) {
  return {
    name: MARKETPLACE_NAME,
    owner: {
      name: AUTHOR.name,
    },
    description:
      "Portable Agent Skills for Django SaaS and agent-first development, packaged for Claude Code.",
    version: marketplaceVersionForSkills(skills),
    plugins: skills.map((skill) => claudeMarketplaceEntryForSkill(skill)),
  };
}

export function codexMarketplaceForSkills(skills) {
  return {
    name: MARKETPLACE_NAME,
    interface: {
      displayName: MARKETPLACE_DISPLAY_NAME,
      brandColor: BRAND_COLOR,
      logo: APP_ICON_PATH,
    },
    plugins: skills.map((skill) => codexMarketplaceEntryForSkill(skill)),
  };
}
