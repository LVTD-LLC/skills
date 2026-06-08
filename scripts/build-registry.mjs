import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { loadSkills, metadataForSkill, root } from "./skill-utils.mjs";
import { validateSkills } from "./validate-skills.mjs";

const distDir = path.join(root, "dist");

async function listFilesRecursive(directory, prefix = "") {
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

async function hashSkillDirectory(skillPath) {
  const hash = createHash("sha256");
  const files = await listFilesRecursive(skillPath);

  for (const file of files) {
    hash.update(file);
    hash.update("\0");
    hash.update(await readFile(path.join(skillPath, file)));
    hash.update("\0");
  }

  return {
    files,
    sha256: hash.digest("hex"),
  };
}

if (!process.argv.includes("--skip-validation")) {
  const { errors } = await validateSkills();

  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
}

const skills = [];
const loadedSkills = await loadSkills();

for (const skill of loadedSkills) {
  const metadata = metadataForSkill(skill);
  const { files, sha256 } = await hashSkillDirectory(skill.path);
  const pluginName = `lvtd-${skill.name}`;

  skills.push({
    name: skill.name,
    displayName: metadata.displayName,
    description: skill.fields.description,
    version: metadata.version,
    license: metadata.license,
    compatibility: metadata.compatibility,
    category: metadata.category,
    tags: metadata.tags,
    path: skill.relativePath,
    entrypoint: skill.entrypoint,
    files,
    sha256,
    hosts: {
      claudeCode: {
        marketplace: "lvtd-skills",
        plugin: pluginName,
      },
      codex: {
        marketplace: "lvtd-skills",
        plugin: pluginName,
      },
    },
  });
}

const registry = {
  schemaVersion: 2,
  name: "Django SaaS Skills",
  repository: "https://github.com/LVTD-LLC/skills",
  generatedAt: new Date().toISOString(),
  skills,
};

await mkdir(distDir, { recursive: true });
await writeFile(path.join(distDir, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`);

console.log(`Wrote dist/registry.json with ${skills.length} skills`);
