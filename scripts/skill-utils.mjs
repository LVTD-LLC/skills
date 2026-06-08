import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

export const root = new URL("..", import.meta.url).pathname;
export const skillsDir = path.join(root, "skills");

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

  for (const line of frontmatter.split("\n")) {
    if (!line.trim()) {
      continue;
    }

    const indent = line.match(/^ */)?.[0].length ?? 0;
    const match = line.trim().match(/^([A-Za-z0-9_.-]+):(?:\s*(.*))?$/);
    if (!match) {
      continue;
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
      continue;
    }

    if (currentObject && typeof currentObject === "object" && !Array.isArray(currentObject)) {
      currentObject[key] = parseScalar(rawValue);
    }
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

export function metadataForSkill(skill) {
  const metadata = skill.fields.metadata ?? {};
  const displayName = metadata["lvtd.displayName"] || skill.name;
  const category = metadata["lvtd.category"] || "Development";
  const version = metadata["lvtd.version"] || "0.1.0";
  const tags = normalizeTags(metadata["lvtd.tags"]);

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
