import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  listSkillNames,
  metadataKeyLabel,
  metadataForSkill,
  metadataValue,
  parseFrontmatter,
  skillsDir,
} from "./skill-utils.mjs";

const SEMVER_RE = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

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

    const rawMetadata = fields.metadata ?? {};
    const metadata = metadataForSkill({ name, fields });
    if (!metadataValue(rawMetadata, "version") || !SEMVER_RE.test(metadata.version)) {
      errors.push(`${skillPath} ${metadataKeyLabel(rawMetadata, "version")} must be semver`);
    }

    if (!metadataValue(rawMetadata, "displayName")) {
      errors.push(
        `${skillPath} must include metadata.displayName or legacy metadata.lvtd.displayName`,
      );
    }

    if (!metadataValue(rawMetadata, "category")) {
      errors.push(`${skillPath} must include metadata.category or legacy metadata.lvtd.category`);
    }

    if (!metadataValue(rawMetadata, "tags")) {
      errors.push(`${skillPath} must include metadata.tags or legacy metadata.lvtd.tags`);
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
