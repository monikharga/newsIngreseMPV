import getClient from "@/lib/mongodb";
import { item } from "@/lib/rssparse";

export const PAGE_SIZE = 12;

export type Page = {
    items: item[];
    hasMore: boolean;
    total: number;
};

export async function getPages(page: number): Promise<Page> {
    const client = await getClient();
    const coll = client.db("rssnews").collection<item>("ainews");

    const skip = (page - 1) * PAGE_SIZE;

    // limit PAGE_SIZE + 1 so we know whether another page exists
    // without a second count query
    const rows = await coll
        .find(
            {},
            {
                projection: {
                    _id: 0,
                    title: 1,
                    content: 1,
                    pubdate: 1,
                    guid: 1,
                },
            }
        )
        .sort({ pubdate: -1, _id: -1 })
        .skip(skip)
        .limit(PAGE_SIZE + 1)
        .toArray();

    const hasMore = rows.length > PAGE_SIZE;
    const total = await coll.estimatedDocumentCount();

    return {
        items: rows.slice(0, PAGE_SIZE),
        hasMore,
        total,
    };
}