import { readFileSync } from "node:fs";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const root = fileURLToPath(new URL("..", import.meta.url));
export const skillsDir = path.join(root, "skills");
export const MARKETPLACE_NAME = "lvtd-skills";
export const MARKETPLACE_DISPLAY_NAME = "LVTD Skills";
export const CATALOG_VERSION = JSON.parse(
  readFileSync(new URL("../package.json", import.meta.url), "utf8"),
).version;

function parseScalar(rawValue) {
  const value = rawValue.trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  if (value.startsWith("[") && value.endsWith("]")) {
    const inner = value.slice(1, -1).trim();
    if (!inner) {
      return [];
    }
    return inner.split(",").map((item) => parseScalar(item));
  }

  return value;
}

export function parseFrontmatter(markdown, filePath = "SKILL.md") {
  if (!markdown.startsWith("---\n")) {
    throw new Error(`${filePath} must start with YAML frontmatter`);
  }

  const end = markdown.indexOf("\n---\n", 4);
  if (end === -1) {
    throw new Error(`${filePath} must close YAML frontmatter with ---`);
  }

  const frontmatter = markdown.slice(4, end).trim();
  const fields = {};
  let currentObject = null;
  let currentArray = null;

  for (const line of frontmatter.split("\n")) {
    if (!line.trim()) {
      continue;
    }

    if (line.trim().startsWith("#")) {
      continue;
    }

    const indent = line.match(/^ */)?.[0].length ?? 0;
    const trimmed = line.trim();

    if (trimmed.startsWith("- ")) {
      if (!currentArray || indent <= currentArray.indent) {
        throw new Error(`${filePath} has a list item outside an array field: ${trimmed}`);
      }

      currentArray.values.push(parseScalar(trimmed.slice(2)));
      continue;
    }

    const match = line.trim().match(/^([A-Za-z0-9_.-]+):(?:\s*(.*))?$/);
    if (!match) {
      throw new Error(`${filePath} has unsupported frontmatter syntax: ${line.trim()}`);
    }

    const [, key, rawValue = ""] = match;
    if (indent === 0) {
      if (rawValue.trim() === "") {
        fields[key] = {};
        currentObject = fields[key];
      } else {
        fields[key] = parseScalar(rawValue);
        currentObject = null;
      }
      currentArray = null;
      continue;
    }

    if (currentObject && typeof currentObject === "object" && !Array.isArray(currentObject)) {
      if (rawValue.trim() === "") {
        currentObject[key] = [];
        currentArray = {
          indent,
          values: currentObject[key],
        };
      } else {
        currentObject[key] = parseScalar(rawValue);
        currentArray = null;
      }
      continue;
    }

    throw new Error(`${filePath} has an indented frontmatter field outside a mapping: ${key}`);
  }

  return fields;
}

export async function listSkillNames() {
  const entries = await readdir(skillsDir);
  const names = [];

  for (const entry of entries) {
    const entryPath = path.join(skillsDir, entry);
    const entryStat = await stat(entryPath);
    if (entryStat.isDirectory()) {
      names.push(entry);
    }
  }

  return names.sort();
}

export async function listFilesRecursive(directory, prefix = "") {
  const entries = await readdir(directory);
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry);
    const relativePath = path.join(prefix, entry).replaceAll(path.sep, "/");
    const entryStat = await stat(absolutePath);

    if (entryStat.isDirectory()) {
      files.push(...(await listFilesRecursive(absolutePath, relativePath)));
    } else {
      files.push(relativePath);
    }
  }

  return files.sort();
}

export function normalizeTags(rawTags) {
  if (Array.isArray(rawTags)) {
    return rawTags.map((tag) => String(tag).trim()).filter(Boolean);
  }

  if (typeof rawTags === "string") {
    return rawTags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

export function metadataValue(metadata, key) {
  return metadata[key] ?? metadata[`lvtd.${key}`];
}

export function metadataKeyLabel(metadata, key) {
  if (Object.hasOwn(metadata, key)) {
    return `metadata.${key}`;
  }

  if (Object.hasOwn(metadata, `lvtd.${key}`)) {
    return `metadata.lvtd.${key}`;
  }

  return `metadata.${key}`;
}

export function metadataForSkill(skill) {
  const metadata = skill.fields.metadata ?? {};
  const displayName = metadataValue(metadata, "displayName") || skill.name;
  const category = metadataValue(metadata, "category") || "Development";
  const version = metadataValue(metadata, "version") || "0.1.0";
  const tags = normalizeTags(metadataValue(metadata, "tags"));

  return {
    displayName,
    category,
    version,
    tags,
    license: skill.fields.license || "MIT",
    compatibility:
      skill.fields.compatibility ||
      "Agent Skills-compatible clients including Codex and Claude Code",
  };
}

export async function loadSkills() {
  const names = await listSkillNames();
  const skills = [];

  for (const name of names) {
    const skillPath = path.join(skillsDir, name, "SKILL.md");
    const markdown = await readFile(skillPath, "utf8");
    const fields = parseFrontmatter(markdown, skillPath);

    skills.push({
      name,
      fields,
      markdown,
      path: path.join(skillsDir, name),
      relativePath: `skills/${name}`,
      entrypoint: `skills/${name}/SKILL.md`,
    });
  }

  return skills;
}
