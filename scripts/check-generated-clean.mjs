import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { root } from "./skill-utils.mjs";

const execFileAsync = promisify(execFile);
const paths = process.argv.slice(2);

if (paths.length === 0) {
  console.error("Pass at least one generated path to check.");
  process.exit(1);
}

let stdout = "";
let stderr = "";

try {
  ({ stdout, stderr } = await execFileAsync("git", ["status", "--porcelain", "--", ...paths], {
    cwd: root,
  }));
} catch (error) {
  console.error(`Unable to check generated artifacts with git: ${error.message}`);
  if (error.stderr?.trim()) {
    console.error(error.stderr.trim());
  }
  process.exit(1);
}

if (stderr.trim()) {
  console.error(stderr.trim());
}

if (stdout.trim()) {
  console.error("Generated artifacts are out of sync. Run npm run build and commit the result:");
  console.error(stdout.trim());
  process.exit(1);
}

console.log(`Generated artifacts are up to date: ${paths.join(", ")}`);
