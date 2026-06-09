import { mkdir, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadSkills, MARKETPLACE_NAME, root } from "./skill-utils.mjs";
import {
  claudeManifestForSkill,
  claudeMarketplaceForSkills,
  codexManifestForSkill,
  codexMarketplaceForSkills,
  pluginNameForSkill,
} from "./marketplace-utils.mjs";
import { validateSkills } from "./validate-skills.mjs";

const marketplaceDir = root;
const pluginsDir = path.join(marketplaceDir, "plugins");

async function writeJson(filePath, payload) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

if (!process.argv.includes("--skip-validation")) {
  const { errors } = await validateSkills();
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
}

const skills = await loadSkills();

await rm(path.join(marketplaceDir, ".claude-plugin"), { recursive: true, force: true });
await rm(path.join(marketplaceDir, ".agents"), { recursive: true, force: true });
await rm(pluginsDir, { recursive: true, force: true });
await mkdir(pluginsDir, { recursive: true });

for (const skill of skills) {
  const pluginName = pluginNameForSkill(skill.name);
  const pluginDir = path.join(pluginsDir, pluginName);
  const pluginSkillsDir = path.join(pluginDir, "skills");
  const skillDestination = path.join(pluginDir, "skills", skill.name);
  const skillLinkTarget = path.relative(pluginSkillsDir, skill.path).replaceAll(path.sep, "/");

  await mkdir(path.join(pluginDir, ".claude-plugin"), { recursive: true });
  await mkdir(path.join(pluginDir, ".codex-plugin"), { recursive: true });
  await mkdir(pluginSkillsDir, { recursive: true });
  await symlink(skillLinkTarget, skillDestination, "dir");

  await writeJson(
    path.join(pluginDir, ".claude-plugin", "plugin.json"),
    claudeManifestForSkill(skill),
  );
  await writeJson(path.join(pluginDir, ".codex-plugin", "plugin.json"), codexManifestForSkill(skill));
}

await writeJson(
  path.join(marketplaceDir, ".claude-plugin", "marketplace.json"),
  claudeMarketplaceForSkills(skills),
);
await writeJson(
  path.join(marketplaceDir, ".agents", "plugins", "marketplace.json"),
  codexMarketplaceForSkills(skills),
);

console.log(`Wrote ${MARKETPLACE_NAME} marketplace with ${skills.length} plugins`);
