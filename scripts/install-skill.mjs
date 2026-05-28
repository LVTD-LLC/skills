import { cp, mkdir, rm, stat } from "node:fs/promises";
import path from "node:path";

const root = new URL("..", import.meta.url).pathname;
const [skillName, targetDir] = process.argv.slice(2);

if (!skillName || !targetDir) {
  console.error("Usage: npm run install-skill -- <skill-name> <target-skill-directory>");
  process.exit(1);
}

if (skillName.includes("/") || skillName.includes("\\")) {
  console.error("Skill name must be a directory name, not a path");
  process.exit(1);
}

const source = path.join(root, "skills", skillName);
const destinationRoot = path.resolve(targetDir.replace(/^~(?=$|\/|\\)/, process.env.HOME || "~"));
const destination = path.join(destinationRoot, skillName);

try {
  const sourceStat = await stat(source);
  if (!sourceStat.isDirectory()) {
    throw new Error();
  }
} catch {
  console.error(`Unknown skill: ${skillName}`);
  process.exit(1);
}

await mkdir(destinationRoot, { recursive: true });
await rm(destination, { recursive: true, force: true });
await cp(source, destination, { recursive: true });

console.log(`Installed ${skillName} to ${destination}`);

