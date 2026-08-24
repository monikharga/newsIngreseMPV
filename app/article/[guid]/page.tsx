import { MongoClient } from "mongodb";
import Link from "next/link";

const client = new MongoClient(process.env.MONGODB_URI!);

async function getArticle(guid: string) {
    await client.connect();

    const db = client.db("rssnews");
    const collection = db.collection("news");

    return await collection.findOne({
        guid: guid,
    });
}

export default async function ArticlePage({
    params,
}: {
    params: Promise<{ guid: string }>;
}) {
    const { guid } = await params;

    const decodedGuid = decodeURIComponent(guid);

    const article = await getArticle(decodedGuid);

    if (!article) {
        return (
            <main className="min-h-screen bg-[#F4F0E6] text-[#241B2F]">

                <header className="border-b-2 border-[#241B2F] bg-[#F4F0E6]">
                    <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
                        <Link href="/" className="group flex w-fit items-center gap-3">

                            <div className="flex h-11 w-11 rotate-[-6deg] items-center justify-center bg-[#D7F36A] transition duration-300 group-hover:rotate-6">
                                <span className="font-[var(--font-display)] text-2xl font-bold">
                                    M
                                </span>
                            </div>

                            <div>
                                <h1 className="font-[var(--font-display)] text-2xl font-bold">
                                    MiniRead
                                </h1>

                                <p className="font-[var(--font-body)] text-[9px] font-bold uppercase tracking-[0.28em]">
                                    News without noise
                                </p>
                            </div>

                        </Link>
                    </div>
                </header>

                <div className="mx-auto max-w-3xl px-5 py-24 text-center">

                    <p className="mb-4 font-[var(--font-body)] text-xs font-bold uppercase tracking-[0.3em] text-[#B63872]">
                        404
                    </p>

                    <h1 className="font-[var(--font-display)] text-5xl font-semibold">
                        Story not found.
                    </h1>

                    <p className="mx-auto mt-5 max-w-md font-[var(--font-body)] text-sm leading-6 text-[#665D69]">
                        This story may have been removed or is no longer
                        available in MiniRead.
                    </p>

                    <Link
                        href="/"
                        className="mt-8 inline-flex items-center gap-3 border-2 border-[#241B2F] bg-[#241B2F] px-5 py-3 font-[var(--font-body)] text-sm font-bold text-[#D7F36A] transition hover:bg-[#B63872]"
                    >
                        ← Back to MiniRead
                    </Link>

                </div>

            </main>
        );
    }

    const formattedDate = new Date(article.pubdate).toLocaleDateString(
        "en-GB",
        {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
        }
    );

    return (
        <main className="min-h-screen bg-[#F4F0E6] text-[#241B2F]">

            {/* HEADER */}

            <header className="border-b-2 border-[#241B2F]">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">

                    <Link
                        href="/"
                        className="group flex items-center gap-3"
                    >

                        <div className="flex h-11 w-11 rotate-[-6deg] items-center justify-center bg-[#D7F36A] transition duration-300 group-hover:rotate-6 group-hover:scale-105">

                            <span className="font-[var(--font-display)] text-2xl font-bold">
                                M
                            </span>

                        </div>

                        <div>

                            <h1 className="font-[var(--font-display)] text-2xl font-bold tracking-tight">
                                MiniRead
                            </h1>

                            <p className="font-[var(--font-body)] text-[9px] font-bold uppercase tracking-[0.28em]">
                                News without noise
                            </p>

                        </div>

                    </Link>


                    <Link
                        href="/"
                        className="hidden font-[var(--font-body)] text-xs font-bold uppercase tracking-widest transition hover:text-[#B63872] sm:block"
                    >
                        All stories ↗
                    </Link>

                </div>

            </header>


            {/* ARTICLE */}

            <article>

                {/* ARTICLE INTRO */}

                <section className="mx-auto max-w-7xl px-5 pb-12 pt-10 sm:px-8 sm:pb-16 sm:pt-14">

                    {/* Back */}

                    <Link
                        href="/"
                        className="group mb-12 inline-flex items-center gap-2 font-[var(--font-body)] text-xs font-bold uppercase tracking-widest text-[#665D69] transition hover:text-[#B63872]"
                    >
                        <span className="transition group-hover:-translate-x-1">
                            ←
                        </span>

                        Back to stories
                    </Link>


                    <div className="grid gap-10 lg:grid-cols-[1fr_280px] lg:items-end">

                        {/* TITLE */}

                        <div>

                            <div className="mb-7 flex items-center gap-3">

                                <span className="border border-[#241B2F] px-3 py-1 font-[var(--font-body)] text-[9px] font-bold uppercase tracking-[0.2em]">
                                    News
                                </span>

                                <span className="h-px w-8 bg-[#241B2F]" />

                                <span className="font-[var(--font-body)] text-[10px] font-bold uppercase tracking-widest text-[#8A818A]">
                                    MiniRead
                                </span>

                            </div>


                            <h1 className="max-w-5xl font-[var(--font-display)] text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                                {article.title}
                            </h1>

                        </div>


                        {/* META */}

                        <div className="border-l-2 border-[#241B2F] pl-5">

                            <p className="font-[var(--font-body)] text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A818A]">
                                Published
                            </p>

                            <p className="mt-2 font-[var(--font-display)] text-xl font-semibold">
                                {formattedDate}
                            </p>

                            <div className="mt-5 h-2 w-14 bg-[#D7F36A]" />

                        </div>

                    </div>

                </section>


                {/* DIVIDER */}

                <div className="border-y-2 border-[#241B2F]">

                    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">

                        <span className="font-[var(--font-body)] text-[9px] font-bold uppercase tracking-[0.25em]">
                            MiniRead / Article
                        </span>

                        <span className="font-[var(--font-body)] text-[9px] font-bold uppercase tracking-[0.25em]">
                            01
                        </span>

                    </div>

                </div>


                {/* CONTENT */}

                <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">

                    <div className="grid gap-10 lg:grid-cols-[180px_1fr]">

                        {/* SIDE */}

                        <aside className="hidden lg:block">

                            <div className="sticky top-10">

                                <p className="font-[var(--font-body)] text-[9px] font-bold uppercase tracking-[0.25em] text-[#8A818A]">
                                    Read
                                </p>

                                <div className="mt-3 h-16 w-1 bg-[#B63872]" />

                                <p className="mt-4 font-[var(--font-body)] text-xs leading-5 text-[#665D69]">
                                    Take your time.
                                    <br />
                                    No noise.
                                </p>

                            </div>

                        </aside>


                        {/* ARTICLE BODY */}

                        <div className="max-w-3xl">

                            <div className="border-2 border-[#241B2F] bg-[#FFFDF7] p-6 shadow-[7px_7px_0px_#D7F36A] sm:p-10 lg:p-14">

                                <div className="font-[var(--font-body)] text-base leading-8 text-[#403746] sm:text-lg sm:leading-9">

                                    <p className="whitespace-pre-line">
                                        {article.content}
                                    </p>

                                </div>

                            </div>


                            {/* END MARKER */}

                            <div className="mt-14 flex items-center gap-4">

                                <div className="h-3 w-3 rotate-45 bg-[#B63872]" />

                                <div className="h-px flex-1 bg-[#241B2F]" />

                                <span className="font-[var(--font-display)] text-sm font-semibold">
                                    End of story
                                </span>

                            </div>


                            {/* BACK BUTTON */}

                            <div className="mt-10">

                                <Link
                                    href="/"
                                    className="group inline-flex items-center gap-3 border-2 border-[#241B2F] px-5 py-3 font-[var(--font-body)] text-sm font-bold transition hover:bg-[#241B2F] hover:text-[#D7F36A]"
                                >

                                    <span className="transition group-hover:-translate-x-1">
                                        ←
                                    </span>

                                    More stories

                                </Link>

                            </div>

                        </div>

                    </div>

                </section>

            </article>


            {/* FOOTER */}

            <footer className="mt-10 border-t-2 border-[#241B2F]">

                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">

                    <div>

                        <h2 className="font-[var(--font-display)] text-xl font-bold">
                            MiniRead
                        </h2>

                        <p className="mt-1 font-[var(--font-body)] text-[9px] font-bold uppercase tracking-[0.25em] text-[#8A818A]">
                            News without noise
                        </p>

                    </div>

                    <p className="font-[var(--font-body)] text-[10px] font-bold uppercase tracking-widest text-[#8A818A]">
                        © 2026 MiniRead
                    </p>

                </div>

            </footer>

        </main>
    );
}