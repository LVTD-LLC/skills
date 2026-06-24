import { createHash } from "node:crypto";
import path from "node:path";
import { pathToFileURL } from "node:url";

const REPOSITORY_URL = "https://github.com/LVTD-LLC/skills";
let catalogPromise;

async function loadBuildUtilities() {
  const root = process.cwd();
  const skillUtils = await import(pathToFileURL(path.join(root, "scripts/skill-utils.mjs")));
  const marketplaceUtils = await import(
    pathToFileURL(path.join(root, "scripts/marketplace-utils.mjs"))
  );

  return { ...skillUtils, ...marketplaceUtils };
}

function markdownSummary(markdown) {
  const normalized = normalizeLineEndings(markdown);
  const body = normalized.replace(/^---\n[\s\S]*?\n---\n/, "").trim();
  const paragraphs = body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => !paragraph.startsWith("#"))
    .filter(Boolean);

  return paragraphs[0]?.replace(/\s+/g, " ").slice(0, 260) || "";
}

function firstHeading(markdown, fallback) {
  return normalizeLineEndings(markdown).match(/^#\s+(.+)$/m)?.[1].trim() || fallback;
}

function normalizeLineEndings(value) {
  return value.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function shortHash(value) {
  return createHash("sha256").update(value).digest("hex").slice(0, 12);
}

function countBy(items, getter) {
  const counts = new Map();

  for (const item of items) {
    const key = getter(item);
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((left, right) => right.count - left.count || left.name.localeCompare(right.name));
}

function pluginSiteIconPath(plugin) {
  if (plugin.iconFile) {
    return `/plugin-icons/${plugin.iconFile}`;
  }

  return "/app-icon.png";
}

export async function buildCatalog() {
  catalogPromise ??= buildCatalogFresh();

  return catalogPromise;
}

async function buildCatalogFresh() {
  const {
    CATALOG_VERSION,
    loadSkills,
    marketplacePluginsForSkills,
    metadataForSkill,
    unmatchedMarketplaceSkills,
  } = await loadBuildUtilities();
  const rawSkills = await loadSkills();
  const rawPlugins = marketplacePluginsForSkills(rawSkills);
  const unmatched = unmatchedMarketplaceSkills(rawSkills, rawPlugins);
  const pluginBySkillName = new Map();

  for (const plugin of rawPlugins) {
    for (const skill of plugin.skills) {
      pluginBySkillName.set(skill.name, plugin.name);
    }
  }

  const skills = rawSkills.map((skill) => {
    const metadata = metadataForSkill(skill);
    const pluginName = pluginBySkillName.get(skill.name) || null;

    return {
      name: skill.name,
      displayName: metadata.displayName,
      title: firstHeading(skill.markdown, metadata.displayName),
      description: skill.fields.description,
      summary: markdownSummary(skill.markdown),
      category: metadata.category,
      version: metadata.version,
      tags: metadata.tags,
      license: metadata.license,
      compatibility: metadata.compatibility,
      pluginName,
      path: skill.relativePath,
      entrypoint: skill.entrypoint,
      sourceUrl: `${REPOSITORY_URL}/tree/main/${skill.relativePath}`,
      installCommand: `npx skills add LVTD-LLC/skills --skill ${skill.name}`,
      fingerprint: shortHash(skill.markdown),
    };
  }).sort((left, right) => left.displayName.localeCompare(right.displayName));

  const skillByName = new Map(skills.map((skill) => [skill.name, skill]));
  const plugins = rawPlugins.map((plugin) => ({
    name: plugin.name,
    displayName: plugin.displayName,
    description: plugin.description,
    category: plugin.category,
    tags: plugin.tags,
    iconPath: pluginSiteIconPath(plugin),
    sourcePath: `plugins/${plugin.name}`,
    sourceUrl: `${REPOSITORY_URL}/tree/main/plugins/${plugin.name}`,
    skills: plugin.skills
      .map((skill) => skillByName.get(skill.name))
      .filter(Boolean)
      .sort((left, right) => left.displayName.localeCompare(right.displayName)),
  })).sort((left, right) => left.displayName.localeCompare(right.displayName));

  return {
    generatedAt: new Date().toISOString(),
    repositoryUrl: REPOSITORY_URL,
    version: CATALOG_VERSION,
    stats: {
      skillCount: skills.length,
      pluginCount: plugins.length,
      categoryCount: countBy(skills, (skill) => skill.category).length,
      unmatchedSkillCount: unmatched.length,
    },
    categories: countBy(skills, (skill) => skill.category),
    tags: countBy(skills.flatMap((skill) => skill.tags), (tag) => tag).slice(0, 36),
    skills,
    plugins,
  };
}

export function skillUrl(skill) {
  return `/skills/${skill.name}/`;
}

export function pluginUrl(plugin) {
  return `/plugins/${plugin.name}/`;
}

export function githubEditUrl(relativePath) {
  return `${REPOSITORY_URL}/edit/main/${path.posix.normalize(relativePath)}`;
}
