import { cp, mkdir, rm, stat, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { loadSkills, MARKETPLACE_NAME, root } from "./skill-utils.mjs";
import {
  APP_ICON_FILE,
  ASSET_DIR,
  claudeManifestForPlugin,
  claudeMarketplaceForSkills,
  codexManifestForPlugin,
  codexMarketplaceForSkills,
  marketplacePluginsForSkills,
  unmatchedMarketplaceSkills,
} from "./marketplace-utils.mjs";
import { validateSkills } from "./validate-skills.mjs";

const marketplaceDir = root;
const pluginsDir = path.join(marketplaceDir, "plugins");
const sourceAssetPath = path.join(marketplaceDir, ASSET_DIR, APP_ICON_FILE);

async function writeJson(filePath, payload) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`);
}

async function pathExists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function copyAppIcon(destinationDir, assetPath = sourceAssetPath) {
  const destination = path.join(destinationDir, ASSET_DIR, APP_ICON_FILE);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(assetPath, destination);
}

if (!process.argv.includes("--skip-validation")) {
  const { errors } = await validateSkills();
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
}

const skills = await loadSkills();
const plugins = marketplacePluginsForSkills(skills);
const unmatchedSkills = unmatchedMarketplaceSkills(skills);

if (unmatchedSkills.length > 0) {
  console.warn(
    `Skipping marketplace plugin generation for unmatched skills: ${unmatchedSkills.map((skill) => skill.name).join(", ")}. Direct skill installs still work; update MARKETPLACE_PLUGIN_GROUPS to publish them in generated marketplace plugins.`,
  );
}

await rm(path.join(marketplaceDir, ".claude-plugin"), { recursive: true, force: true });
await rm(path.join(marketplaceDir, ".agents"), { recursive: true, force: true });
await rm(pluginsDir, { recursive: true, force: true });
await mkdir(pluginsDir, { recursive: true });

for (const plugin of plugins) {
  const pluginDir = path.join(pluginsDir, plugin.name);
  const pluginSkillsDir = path.join(pluginDir, "skills");
  let appIconPath = sourceAssetPath;

  await mkdir(path.join(pluginDir, ".claude-plugin"), { recursive: true });
  await mkdir(path.join(pluginDir, ".codex-plugin"), { recursive: true });
  await mkdir(pluginSkillsDir, { recursive: true });

  for (const skill of plugin.skills) {
    const skillDestination = path.join(pluginSkillsDir, skill.name);
    const skillLinkTarget = path.relative(pluginSkillsDir, skill.path).replaceAll(path.sep, "/");
    const skillAssetPath = path.join(skill.path, ASSET_DIR, APP_ICON_FILE);

    if (appIconPath === sourceAssetPath && (await pathExists(skillAssetPath))) {
      appIconPath = skillAssetPath;
    }

    await symlink(skillLinkTarget, skillDestination, "dir");
  }

  await copyAppIcon(pluginDir, appIconPath);

  await writeJson(
    path.join(pluginDir, ".claude-plugin", "plugin.json"),
    claudeManifestForPlugin(plugin),
  );
  await writeJson(path.join(pluginDir, ".codex-plugin", "plugin.json"), codexManifestForPlugin(plugin));
}

await writeJson(
  path.join(marketplaceDir, ".claude-plugin", "marketplace.json"),
  claudeMarketplaceForSkills(skills),
);
await writeJson(
  path.join(marketplaceDir, ".agents", "plugins", "marketplace.json"),
  codexMarketplaceForSkills(skills),
);
await copyAppIcon(path.join(marketplaceDir, ".agents", "plugins"));

console.log(`Wrote ${MARKETPLACE_NAME} marketplace with ${plugins.length} plugins`);
