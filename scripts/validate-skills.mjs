import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import {
  listSkillNames,
  metadataKeyLabel,
  metadataForSkill,
  metadataValue,
  normalizeTags,
  parseFrontmatter,
  skillsDir,
} from "./skill-utils.mjs";

const SEMVER_RE = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const SKILL_NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const TAG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export async function validateSkills() {
  const names = await listSkillNames();
  const errors = [];
  const displayNames = new Map();

  if (names.length === 0) {
    errors.push("skills/ must contain at least one skill directory");
  }

  for (const name of names) {
    if (!SKILL_NAME_RE.test(name)) {
      errors.push(`${name} directory must be lowercase hyphen-case`);
    }

    if (name.length > 64) {
      errors.push(`${name} directory name must be 64 characters or fewer`);
    }

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

    if (!isNonEmptyString(fields.description) || fields.description.length < 40) {
      errors.push(`${skillPath} must include a useful description`);
    }

    const rawMetadata = fields.metadata ?? {};
    const metadata = metadataForSkill({ name, fields });
    const rawVersion = metadataValue(rawMetadata, "version");
    const rawDisplayName = metadataValue(rawMetadata, "displayName");
    const rawCategory = metadataValue(rawMetadata, "category");
    const rawTags = metadataValue(rawMetadata, "tags");
    const tags = normalizeTags(rawTags);

    if (!isNonEmptyString(rawVersion) || !SEMVER_RE.test(rawVersion)) {
      errors.push(`${skillPath} ${metadataKeyLabel(rawMetadata, "version")} must be semver`);
    }

    if (!isNonEmptyString(rawDisplayName)) {
      errors.push(
        `${skillPath} must include metadata.displayName or legacy metadata.lvtd.displayName`,
      );
    } else if (displayNames.has(rawDisplayName)) {
      errors.push(
        `${skillPath} metadata.displayName duplicates ${displayNames.get(rawDisplayName)}`,
      );
    } else {
      displayNames.set(rawDisplayName, skillPath);
    }

    if (!isNonEmptyString(rawCategory)) {
      errors.push(`${skillPath} must include metadata.category or legacy metadata.lvtd.category`);
    }

    if (!rawTags || tags.length === 0) {
      errors.push(`${skillPath} must include metadata.tags or legacy metadata.lvtd.tags`);
    }

    for (const tag of tags) {
      if (!TAG_RE.test(tag)) {
        errors.push(`${skillPath} metadata.tags contains invalid tag "${tag}"`);
      }
    }

    if (new Set(tags).size !== tags.length) {
      errors.push(`${skillPath} metadata.tags must not include duplicate tags`);
    }

    if (typeof metadata.displayName === "string" && metadata.displayName.startsWith("LVTD ")) {
      errors.push(`${skillPath} metadata.displayName should omit the LVTD prefix`);
    }

    if (!markdown.match(/\n#\s+\S/)) {
      errors.push(`${skillPath} must include a top-level heading`);
    }

    if (markdown.includes("\r\n")) {
      errors.push(`${skillPath} should use LF line endings`);
    }

    const scriptsPath = path.join(skillsDir, name, "scripts");
    try {
      const scriptEntries = await readdir(scriptsPath, { withFileTypes: true });
      for (const entry of scriptEntries) {
        if (!entry.isFile()) {
          continue;
        }

        const scriptPath = path.join(scriptsPath, entry.name);
        const scriptStat = await stat(scriptPath);
        if ((scriptStat.mode & 0o111) === 0) {
          errors.push(`${scriptPath} must be executable`);
        }
      }
    } catch (error) {
      if (error.code !== "ENOENT") {
        errors.push(`${scriptsPath} must be readable: ${error.message}`);
      }
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
