import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { validateSkills } from "./validate-skills.mjs";

const root = new URL("..", import.meta.url).pathname;
const skillsDir = path.join(root, "skills");
const distDir = path.join(root, "dist");

function parseFrontmatter(markdown) {
  const end = markdown.indexOf("\n---\n", 4);
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

const { names, errors } = await validateSkills();

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const skills = [];

for (const name of names) {
  const relativePath = `skills/${name}/SKILL.md`;
  const markdown = await readFile(path.join(skillsDir, name, "SKILL.md"), "utf8");
  const fields = parseFrontmatter(markdown);

  skills.push({
    name,
    description: fields.description,
    path: relativePath,
  });
}

const registry = {
  schemaVersion: 1,
  name: "LVTD Skills",
  repository: "https://github.com/LVTD-LLC/skills",
  generatedAt: new Date().toISOString(),
  skills,
};

await mkdir(distDir, { recursive: true });
await writeFile(path.join(distDir, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`);

console.log(`Wrote dist/registry.json with ${skills.length} skills`);

