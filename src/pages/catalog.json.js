import { buildCatalog } from "../lib/catalog.mjs";

export async function GET() {
  const catalog = await buildCatalog();

  return new Response(JSON.stringify(catalog, null, 2));
}
