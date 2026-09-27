import Rss from "@/app/rss/rss-view";
import { getPages, PAGE_SIZE } from "@/lib/news";
import { item } from "@/lib/rssparse";

export default async function Home({ searchParams }: PageProps<"/">) {
  const p = Number((await searchParams).p) || 1;
  const pages = Array.from({ length: Math.max(1, p) }, (_, i) => i + 1);

  // Render pages 1..p, not just page p. The earlier pages have to be back in
  // the DOM or the document is too short to hold the restored scroll offset.
  const results = await Promise.all(pages.map((n) => getPages(n)));

  const seen = new Set<string>();
  const items = results
    .flatMap((r) => r.items)
    .filter((e: item) => !seen.has(e.guid) && seen.add(e.guid));

  return (
<Rss
      items={items}
      page={p}
      hasMore={results[results.length - 1].hasMore}
      total={results[0].total}
    />
  );
}