import { validateSkills } from "../scripts/validate-skills.mjs";

const { names, errors } = await validateSkills();

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`All skill tests passed for ${names.length} skills`);

