import {
  CATALOG_VERSION,
  MARKETPLACE_DISPLAY_NAME,
  MARKETPLACE_NAME,
  metadataForSkill,
} from "./skill-utils.mjs";

export const REPOSITORY_URL = "https://github.com/LVTD-LLC/skills";
export const BRAND_COLOR = "#FF4057";
export const ASSET_DIR = "assets";
export const APP_ICON_FILE = "app-icon.png";
export const APP_ICON_PATH = `./${ASSET_DIR}/${APP_ICON_FILE}`;
export const PLUGIN_ICON_DIR = "plugin-icons";
export const AUTHOR = {
  name: "LVTD",
  url: "https://github.com/LVTD-LLC",
};

const MARKETPLACE_PLUGIN_GROUPS = [
  {
    name: "router",
    displayName: "Skill Router",
    category: "Productivity",
    taskLabel: "choosing LVTD skills",
    description:
      "Router guidance for choosing LVTD skills across coding, SEO, writing, product, library, and template workflows.",
    tags: ["skills", "router", "workflow", "agents"],
    matches: (skill) => skill.name === "lvtd-skills-router" || hasSkillTag(skill, "router"),
  },
  {
    name: "rust",
    displayName: "Rust",
    category: "Coding",
    taskLabel: "Rust",
    description:
      "Rust workflow guidance for production backend services, including testing, persistence, observability, security, idempotency, and deployment.",
    iconFile: "rust.svg",
    tags: ["rust", "backend", "api-testing", "sqlx", "observability", "security", "deployment"],
    matches: (skill) => hasSkillTag(skill, "rust") || skill.name.startsWith("rust-"),
  },
  {
    name: "django",
    displayName: "Django",
    category: "Coding",
    taskLabel: "Django",
    description:
      "Django workflow guidance for server-rendered UI, jobs, MCP servers, and app behavior.",
    iconFile: "django.svg",
    tags: ["django", "htmx", "alpinejs", "background-jobs", "mcp", "testing", "ci", "pytest"],
    matches: (skill) => hasSkillTag(skill, "django") || skill.name.includes("django"),
  },
  {
    name: "nonfiction-book-writing",
    displayName: "Nonfiction Book Writing",
    category: "Writing",
    taskLabel: "nonfiction book writing",
    description:
      "Nonfiction book writing guidance for planning, editing, beta reading, launching, and publishing useful books.",
    iconFile: "nonfiction-book-writing.svg",
    tags: ["writing", "books", "nonfiction", "editing", "launch", "publishing"],
    matches: (skill) => hasSkillTag(skill, "books") && hasSkillTag(skill, "nonfiction"),
  },
  {
    name: "traction",
    displayName: "Traction",
    category: "Marketing",
    taskLabel: "startup traction and growth marketing",
    description:
      "Traction and Bullseye workflow guidance for choosing, testing, and reviewing startup growth channels.",
    iconFile: "traction.svg",
    tags: ["traction", "growth", "marketing", "startups", "bullseye"],
    matches: (skill) => isTractionSkill(skill),
  },
  {
    name: "cookiecutter",
    displayName: "Cookiecutter",
    category: "Coding",
    taskLabel: "Cookiecutter",
    description: "Cookiecutter template development workflow guidance.",
    iconFile: "cookiecutter.svg",
    tags: ["cookiecutter", "templates", "jinja", "scaffolding"],
    matches: (skill) => skill.name === "cookiecutter" || hasSkillTag(skill, "cookiecutter"),
  },
  {
    name: "seo",
    displayName: "SEO",
    category: "Marketing",
    taskLabel: "SEO",
    description:
      "SEO workflow guidance for product-led strategy, opportunity research, personas, technical triage, and roadmap planning.",
    iconFile: "seo.svg",
    tags: ["seo", "organic-growth", "content-strategy", "technical-seo", "planning"],
    matches: (skill) => hasSkillTag(skill, "seo") && !isTractionSkill(skill),
  },
];

function hasSkillTag(skill, tag) {
  return metadataForSkill(skill).tags.includes(tag);
}

function isTractionSkill(skill) {
  return hasSkillTag(skill, "traction") || skill.name.startsWith("traction-");
}

function uniqueValues(values) {
  return [...new Set(values.filter(Boolean))];
}

function displayNamesForPlugin(plugin) {
  return plugin.skills.map((skill) => metadataForSkill(skill).displayName);
}

function joinDisplayNames(displayNames) {
  if (displayNames.length <= 2) {
    return displayNames.join(" and ");
  }

  return `${displayNames.slice(0, -1).join(", ")}, and ${displayNames.at(-1)}`;
}

function licenseForPlugin(plugin) {
  const licenses = uniqueValues(plugin.skills.map((skill) => metadataForSkill(skill).license));

  if (licenses.length === 0) {
    return "MIT";
  }

  if (licenses.length === 1) {
    return licenses[0];
  }

  return licenses.join(" OR ");
}

export function marketplacePluginsForSkills(skills) {
  const assignedSkillNames = new Map();

  return MARKETPLACE_PLUGIN_GROUPS.map((group) => {
    const pluginSkills = skills.filter((skill) => group.matches(skill));

    for (const skill of pluginSkills) {
      const previousGroup = assignedSkillNames.get(skill.name);

      if (previousGroup) {
        throw new Error(
          `${skill.name} matches both marketplace plugins ${previousGroup} and ${group.name}`,
        );
      }

      assignedSkillNames.set(skill.name, group.name);
    }

    return {
      ...group,
      skills: pluginSkills,
    };
  }).filter((plugin) => plugin.skills.length > 0);
}

export function marketplacePluginBySkillName(skills, plugins = marketplacePluginsForSkills(skills)) {
  const pluginBySkillName = new Map();

  for (const plugin of plugins) {
    for (const skill of plugin.skills) {
      pluginBySkillName.set(skill.name, plugin);
    }
  }

  return pluginBySkillName;
}

export function unmatchedMarketplaceSkills(skills, plugins = marketplacePluginsForSkills(skills)) {
  const pluginBySkillName = marketplacePluginBySkillName(skills, plugins);

  return skills.filter((skill) => !pluginBySkillName.has(skill.name));
}

function skillsForMarketplacePlugins(plugins) {
  return plugins.flatMap((plugin) => plugin.skills);
}

export function buildDefaultPrompt(plugin) {
  return `Use the ${plugin.displayName} plugin when working on ${plugin.taskLabel} tasks. It includes the ${joinDisplayNames(displayNamesForPlugin(plugin))} skill${plugin.skills.length === 1 ? "" : "s"}.`;
}

export function buildLongDescription(plugin) {
  return `${plugin.description} Packaged as a marketplace plugin for Codex and Claude Code. Includes: ${displayNamesForPlugin(plugin).join(", ")}. Category: ${plugin.category}.`;
}

export function buildShortDescription(plugin) {
  return plugin.description;
}

export function keywordsForPlugin(plugin) {
  return uniqueValues([
    plugin.name,
    ...plugin.tags,
    ...plugin.skills.map((skill) => skill.name),
    ...plugin.skills.flatMap((skill) => metadataForSkill(skill).tags),
  ]);
}

export function pluginIconFile(plugin) {
  return plugin.iconFile || APP_ICON_FILE;
}

export function pluginIconPath(plugin) {
  return `./${ASSET_DIR}/${pluginIconFile(plugin)}`;
}

export function commonManifestForPlugin(plugin) {
  return {
    name: plugin.name,
    version: CATALOG_VERSION,
    description: buildShortDescription(plugin),
    author: AUTHOR,
    homepage: REPOSITORY_URL,
    repository: REPOSITORY_URL,
    license: licenseForPlugin(plugin),
    keywords: keywordsForPlugin(plugin),
    skills: "./skills/",
  };
}

export function claudeManifestForPlugin(plugin) {
  return {
    ...commonManifestForPlugin(plugin),
    displayName: plugin.displayName,
  };
}

export function codexManifestForPlugin(plugin) {
  const shortDescription = buildShortDescription(plugin);
  const iconPath = pluginIconPath(plugin);

  return {
    ...commonManifestForPlugin(plugin),
    interface: {
      displayName: plugin.displayName,
      shortDescription,
      longDescription: buildLongDescription(plugin),
      developerName: "LVTD",
      category: plugin.category,
      capabilities: ["Interactive", "Read"],
      websiteURL: REPOSITORY_URL,
      defaultPrompt: [buildDefaultPrompt(plugin)],
      brandColor: BRAND_COLOR,
      composerIcon: iconPath,
      logo: iconPath,
      screenshots: [],
    },
  };
}

export function claudeMarketplaceEntryForPlugin(plugin) {
  return {
    name: plugin.name,
    displayName: plugin.displayName,
    source: `./plugins/${plugin.name}`,
    description: buildShortDescription(plugin),
    author: {
      name: AUTHOR.name,
    },
    homepage: REPOSITORY_URL,
    repository: REPOSITORY_URL,
    license: licenseForPlugin(plugin),
    category: plugin.category,
    tags: plugin.tags,
    keywords: keywordsForPlugin(plugin),
  };
}

export function codexMarketplaceEntryForPlugin(plugin) {
  return {
    name: plugin.name,
    source: {
      source: "local",
      path: `./plugins/${plugin.name}`,
    },
    policy: {
      installation: "AVAILABLE",
      authentication: "ON_USE",
    },
    category: plugin.category,
  };
}

export function claudeMarketplaceForSkills(skills, plugins = marketplacePluginsForSkills(skills)) {
  return {
    name: MARKETPLACE_NAME,
    owner: {
      name: AUTHOR.name,
    },
    description:
      "Portable Agent Skills for coding and writing workflows, packaged for Claude Code.",
    version: CATALOG_VERSION,
    plugins: plugins.map((plugin) => claudeMarketplaceEntryForPlugin(plugin)),
  };
}

export function codexMarketplaceForSkills(skills, plugins = marketplacePluginsForSkills(skills)) {
  return {
    name: MARKETPLACE_NAME,
    interface: {
      displayName: MARKETPLACE_DISPLAY_NAME,
      brandColor: BRAND_COLOR,
      logo: APP_ICON_PATH,
    },
    plugins: plugins.map((plugin) => codexMarketplaceEntryForPlugin(plugin)),
  };
}
