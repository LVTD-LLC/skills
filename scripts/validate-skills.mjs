import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = new URL("..", import.meta.url).pathname;
const skillsDir = path.join(root, "skills");

function parseFrontmatter(markdown, filePath) {
  if (!markdown.startsWith("---\n")) {
    throw new Error(`${filePath} must start with YAML frontmatter`);
  }

  const end = markdown.indexOf("\n---\n", 4);
  if (end === -1) {
    throw new Error(`${filePath} must close YAML frontmatter with ---`);
  }

  const frontmatter = markdown.slice(4, end).trim();
  const fields = {};

  for (const line of frontmatter.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) {
      continue;
    }

    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    fields[match[1]] = value;
  }

  return fields;
}

async function listSkillNames() {
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

export async function validateSkills() {
  const names = await listSkillNames();
  const errors = [];

  if (names.length === 0) {
    errors.push("skills/ must contain at least one skill directory");
  }

  for (const name of names) {
    const skillPath = path.join(skillsDir, name, "SKILL.md");
    let markdown = "";

    try {
      markdown = await readFile(skillPath, "utf8");
    } catch {
      errors.push(`${name} is missing SKILL.md`);
      continue;
    }

    let fields = {};
    try {
      fields = parseFrontmatter(markdown, skillPath);
    } catch (error) {
      errors.push(error.message);
      continue;
    }

    if (fields.name !== name) {
      errors.push(`${skillPath} frontmatter name must match directory name "${name}"`);
    }

    if (!fields.description || fields.description.length < 40) {
      errors.push(`${skillPath} must include a useful description`);
    }

    if (!markdown.match(/\n#\s+\S/)) {
      errors.push(`${skillPath} must include a top-level heading`);
    }

    if (markdown.includes("\r\n")) {
      errors.push(`${skillPath} should use LF line endings`);
    }
  }

  return { names, errors };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { names, errors } = await validateSkills();

  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exit(1);
  }

  console.log(`Validated ${names.length} skills: ${names.join(", ")}`);
}

