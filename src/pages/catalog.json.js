import { buildCatalog } from "../lib/catalog.mjs";

export async function GET() {
  const catalog = await buildCatalog();

  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300",
    },
  });
}
