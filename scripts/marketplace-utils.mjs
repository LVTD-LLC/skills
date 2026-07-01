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

const WEB_DESIGN_MATH_SKILL_NAMES = new Set([
  "color-math-accessibility",
  "css-grid-math",
  "css-math-units",
  "flexbox-math",
  "frontend-math-foundations",
  "javascript-ui-math",
  "responsive-layout-math",
]);

const MARKETPLACE_PLUGIN_GROUPS = [
  {
    name: "router",
    displayName: "Skill Router",
    category: "Productivity",
    taskLabel: "choosing LVTD skills",
    description:
      "Router guidance for choosing LVTD skills across coding, SEO, writing, product, library, and template workflows.",
    tags: ["skills", "router", "workflow", "agents"],
    matches: (skill) => skill.name === "lvtd-skills-router",
  },
  {
    name: "game-design",
    displayName: "Game Design",
    category: "Game Development",
    taskLabel: "game design, prototyping, playtesting, and AI-assisted game development",
    description:
      "Game design workflow guidance for prototyping, mechanics, balance, player experience, interface feedback, playtesting, narrative systems, design docs, and responsibility reviews.",
    iconFile: "game-design.svg",
    tags: ["game-design", "games", "prototyping", "playtesting", "balance", "narrative", "ux"],
    matches: (skill) => hasSkillTag(skill, "game-design"),
  },
  {
    name: "rust-core",
    displayName: "Rust Core Engineering",
    category: "Coding",
    taskLabel: "Rust systems, services, libraries, and language-level code",
    description:
      "Rust core engineering guidance for production services, language-level code, and reusable libraries, including testing, persistence, ownership, traits, iterators, concurrency, async, unsafe, FFI, security, deployment, SQLx, observability, benchmarking, feature flags, rustdoc, and crate publishing.",
    iconFile: "rust.svg",
    tags: [
      "rust",
      "backend",
      "api-testing",
      "sqlx",
      "ownership",
      "traits",
      "iterators",
      "concurrency",
      "async",
      "unsafe",
      "ffi",
      "observability",
      "security",
      "deployment",
      "library",
      "benchmarking",
      "rustdoc",
      "publishing",
    ],
    matches: (skill) => isRustCoreSkill(skill),
  },
  {
    name: "rust-game-development",
    displayName: "Rust Game Development",
    category: "Coding",
    taskLabel: "Rust and Bevy game development",
    description:
      "Rust game development guidance for Bevy and other Rust game stacks, including asset pipelines, state flow, fixed-step physics, collision broadphases, procedural worlds, game loops, ECS gameplay, tilemaps, cameras, turn systems, roguelike procgen, content pipelines, slice planning, polish, and release checks.",
    iconFile: "game-geometry.svg",
    tags: [
      "rust",
      "game-development",
      "gamedev",
      "bevy",
      "ecs",
      "tilemaps",
      "procgen",
      "data-driven-content",
      "assets",
      "state-management",
      "physics",
      "collision",
      "world-building",
      "game-loop",
      "roguelike",
      "polish",
    ],
    matches: (skill) => isRustGameDevelopmentSkill(skill),
  },
  {
    name: "game-geometry",
    displayName: "Game Geometry",
    category: "Coding",
    taskLabel: "game geometry",
    description:
      "Game geometry guidance for representation choice, spatial queries, transforms, vector math, smooth curves, fields, SDFs, meshes, voxels, and conversion workflows.",
    iconFile: "game-geometry.svg",
    tags: [
      "game-dev",
      "game-geometry",
      "geometry",
      "collision",
      "transforms",
      "splines",
      "sdf",
      "meshes",
      "voxels",
    ],
    matches: (skill) => hasSkillTag(skill, "game-geometry") || skill.name.startsWith("game-geometry-"),
  },
  {
    name: "django",
    displayName: "Django",
    category: "Coding",
    taskLabel: "Django",
    description:
      "Django workflow guidance for database performance, server-rendered UI, jobs, MCP servers, testing, and app behavior.",
    iconFile: "django.svg",
    tags: ["django", "database", "performance", "orm", "htmx", "alpinejs", "background-jobs", "mcp", "testing", "ci", "pytest"],
    matches: (skill) => hasSkillTag(skill, "django") || skill.name.includes("django"),
  },
  {
    name: "htmx",
    displayName: "htmx",
    category: "Coding",
    taskLabel: "server-driven htmx web apps",
    description:
      "Framework-neutral htmx workflow guidance for foundations, endpoint contracts, common recipes, local interactivity, JavaScript API integration, security, polling, SSE, and WebSockets.",
    iconFile: "icons8-code.svg",
    tags: [
      "htmx",
      "frontend",
      "server-driven-ui",
      "html",
      "security",
      "realtime",
      "websockets",
      "sse",
    ],
    matches: (skill) => skill.name.startsWith("htmx-"),
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
    name: "developer-docs",
    displayName: "Developer Documentation",
    category: "Writing",
    taskLabel:
      "developer documentation, technical writing, technical research, SaaS docs, docs tooling, docs quality, and docs operations",
    description:
      "Developer documentation workflow guidance for audience research, technical research, planning, drafting, editing, code samples, visuals, SaaS docs, Agile integration, platform selection, feedback, quality metrics, information architecture, release, maintenance, and deprecation.",
    iconFile: "developer-docs.svg",
    tags: [
      "developer-docs",
      "technical-writing",
      "documentation",
      "api-docs",
      "code-samples",
      "docs-ops",
      "quality",
      "information-architecture",
      "research",
      "saas",
      "agile",
      "platform-selection",
    ],
    matches: (skill) => hasSkillTag(skill, "developer-docs"),
  },
  {
    name: "web-design-math",
    displayName: "Web Design Math",
    category: "Coding",
    taskLabel: "web design math, frontend layout math, CSS math, and UI number logic",
    description:
      "Web design math guidance for CSS units, grid, flexbox, responsive layouts, color accessibility, JavaScript UI numbers, and frontend math foundations.",
    iconFile: "web-design-math.svg",
    tags: [
      "web-design",
      "frontend",
      "css",
      "layout",
      "math",
      "responsive-design",
      "accessibility",
      "javascript",
    ],
    matches: (skill) => WEB_DESIGN_MATH_SKILL_NAMES.has(skill.name),
  },
  {
    name: "customer-discovery",
    displayName: "Customer Discovery",
    category: "Marketing",
    taskLabel: "customer discovery and customer interviews",
    description:
      "Customer discovery guidance for interview planning, segment slicing, conversation access, commitment validation, and learning synthesis.",
    tags: [
      "customer-discovery",
      "customer-interviews",
      "validation",
      "research",
      "startups",
    ],
    matches: (skill) => hasSkillTag(skill, "customer-discovery"),
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
    name: "eighty-twenty",
    displayName: "80/20 Sales Marketing",
    category: "Marketing",
    taskLabel: "80/20 sales and marketing",
    description:
      "80/20 sales and marketing workflow guidance for leverage, market selection, traffic, conversion, offers, funnel economics, customer value, and time or team prioritization.",
    iconFile: "eighty-twenty.svg",
    tags: ["eighty-twenty", "sales", "marketing", "pareto", "funnels"],
    matches: (skill) =>
      hasSkillTag(skill, "eighty-twenty") || skill.name.startsWith("eighty-twenty-"),
  },
  {
    name: "linkedin-writing",
    displayName: "LinkedIn Writing",
    category: "Marketing",
    taskLabel: "LinkedIn post writing, content ideation, comments, newsletters, and content experiments",
    description:
      "LinkedIn writing workflow guidance for posts, content ideas, comments, articles, newsletters, and performance-driven content iteration.",
    iconFile: "linkedin.svg",
    tags: ["linkedin-writing", "linkedin", "content-writing", "social-media", "posts", "newsletters"],
    matches: (skill) => hasSkillTag(skill, "linkedin-writing"),
  },
  {
    name: "b2b-sales",
    displayName: "B2B Sales",
    category: "Marketing",
    taskLabel: "B2B sales diagnosis and pipeline repair",
    description:
      "B2B sales workflow guidance for diagnosing pipeline constraints and engineering reach, resonance, timing, and trust.",
    iconFile: "b2b-sales.svg",
    tags: ["b2b-sales", "sales", "pipeline", "outbound", "messaging", "trust"],
    matches: (skill) => hasSkillTag(skill, "b2b-sales"),
  },
  {
    name: "influence",
    displayName: "Influence Persuasion",
    category: "Marketing",
    taskLabel: "ethical persuasion, influence audits, social proof, authority, scarcity, reciprocity, commitment, liking, and contrast framing",
    description:
      "Influence and persuasion guidance for ethical audits, offer design, commitment ladders, social proof, rapport, authority signals, scarcity, urgency, and contrast framing.",
    iconFile: "icons8-expand_influence.svg",
    tags: [
      "influence",
      "persuasion",
      "ethics",
      "marketing",
      "copywriting",
      "social-proof",
      "authority",
      "scarcity",
      "reciprocity",
      "commitment",
      "rapport",
    ],
    matches: (skill) => hasSkillTag(skill, "influence"),
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
      "SEO workflow guidance for product-led strategy, opportunity research, technical triage, roadmap planning, and link-building campaigns.",
    iconFile: "seo.svg",
    tags: [
      "seo",
      "organic-growth",
      "content-strategy",
      "technical-seo",
      "link-building",
      "outreach",
      "planning",
    ],
    matches: (skill) => hasSkillTag(skill, "seo") && !isTractionSkill(skill),
  },
];

function hasSkillTag(skill, tag) {
  return metadataForSkill(skill).tags.includes(tag);
}

function isRustSkill(skill) {
  return hasSkillTag(skill, "rust") || skill.name.startsWith("rust-");
}

function isRustGameDevelopmentSkill(skill) {
  return isRustSkill(skill) && hasSkillTag(skill, "gamedev");
}

function isRustCoreSkill(skill) {
  return isRustSkill(skill) && !isRustGameDevelopmentSkill(skill);
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
