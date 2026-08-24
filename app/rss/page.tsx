'use client'

import axios from "axios";
import { item } from "../../lib/rssparse";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Rss() {
    const [arr, setArr] = useState<item[]>([]);

    const fetc = async () => {
        try {
            const res = await axios.get("/api/front");
            setArr(res.data.arr);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetc();
    }, []);

    return (
        <main className="min-h-screen bg-[#F4F0E6] text-[#241B2F]">

            {/* HEADER */}
            <header className="border-b-2 border-[#241B2F]">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">

                    <Link href="/" className="group flex items-center gap-3">

                        <div className="relative flex h-11 w-11 rotate-[-6deg] items-center justify-center bg-[#D7F36A] transition duration-300 group-hover:rotate-6 group-hover:scale-110">
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

                    <div className="hidden items-center gap-8 md:flex">

                        <Link
                            href="/"
                            className="font-[var(--font-body)] text-sm font-semibold transition hover:text-[#B63872]"
                        >
                            Latest
                        </Link>

                        <span className="h-5 w-px bg-[#241B2F]" />

                        <span className="font-[var(--font-body)] text-sm font-semibold">
                            {arr.length} stories
                        </span>

                    </div>

                </div>
            </header>


            {/* HERO */}
            <section className="mx-auto max-w-7xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20">

                <div className="grid items-end gap-8 md:grid-cols-[1fr_300px]">

                    <div>

                        <p className="mb-5 font-[var(--font-body)] text-xs font-bold uppercase tracking-[0.3em] text-[#B63872]">
                            The daily brief
                        </p>

                        <h2 className="max-w-5xl font-[var(--font-display)] text-6xl font-semibold leading-[0.88] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
                            Know more.
                            <br />

                            <span className="relative inline-block">
                                Read less.

                                <span className="absolute bottom-1 left-0 -z-0 h-3 w-full rotate-[-2deg] bg-[#D7F36A]" />
                            </span>
                        </h2>

                    </div>

                    <div className="border-l-2 border-[#241B2F] pl-5">

                        <p className="font-[var(--font-body)] text-sm leading-6">
                            The important stories, stripped of clutter and
                            delivered in a format worth actually reading.
                        </p>

                    </div>

                </div>

            </section>


            {/* NEWS */}
            <section className="border-t-2 border-[#241B2F]">

                <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">

                    <div className="mb-10 flex items-center justify-between">

                        <h2 className="font-[var(--font-display)] text-3xl font-semibold">
                            Today's stories
                        </h2>

                        <span className="font-[var(--font-body)] text-xs font-bold uppercase tracking-widest">
                            01 — {arr.length.toString().padStart(2, "0")}
                        </span>

                    </div>


                    {/* CARDS */}

                    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                        {arr.map((e, index) => (

                            <Link
                                key={e.guid}
                                href={`/article/${encodeURIComponent(e.guid)}`}
                                className="group"
                            >

                                <article
                                    className={`
                                        relative flex min-h-[390px] flex-col
                                        border-2 border-[#241B2F]
                                        bg-[#FFFDF7]
                                        p-6
                                        transition-all
                                        duration-300
                                        hover:-translate-y-2
                                        hover:shadow-[8px_8px_0px_#241B2F]
                                        ${index % 3 === 0
                                            ? "md:min-h-[430px]"
                                            : ""
                                        }
                                    `}
                                >

                                    {/* NUMBER */}
                                    <div className="flex items-start justify-between">

                                        <span className="font-[var(--font-display)] text-5xl font-semibold leading-none text-[#D8D2C5]">
                                            {(index + 1)
                                                .toString()
                                                .padStart(2, "0")}
                                        </span>

                                        <span className="border border-[#241B2F] px-2 py-1 font-[var(--font-body)] text-[9px] font-bold uppercase tracking-widest">
                                            News
                                        </span>

                                    </div>


                                    {/* TITLE */}

                                    <h3 className="mt-12 font-[var(--font-display)] text-3xl font-semibold leading-[1] tracking-[-0.025em] transition duration-300 group-hover:text-[#B63872]">
                                        {e.title}
                                    </h3>


                                    {/* CONTENT */}

                                    <p className="mt-5 line-clamp-4 font-[var(--font-body)] text-sm leading-6 text-[#665D69]">
                                        {e.content}
                                    </p>


                                    {/* FOOTER */}

                                    <div className="mt-auto flex items-end justify-between pt-8">

                                        <time className="font-[var(--font-body)] text-[10px] font-bold uppercase tracking-wider text-[#8A818A]">
                                            {new Date(
                                                e.pubdate
                                            ).toLocaleDateString(
                                                "en-GB",
                                                {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </time>


                                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#241B2F] text-xl text-[#D7F36A] transition duration-300 group-hover:rotate-[-45deg] group-hover:bg-[#B63872]">
                                            ↗
                                        </span>

                                    </div>

                                </article>

                            </Link>

                        ))}

                    </div>

                </div>

            </section>


            {/* FOOTER */}

            <footer className="border-t-2 border-[#241B2F]">

                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-8 sm:px-8">

                    <h2 className="font-[var(--font-display)] text-xl font-bold">
                        MiniRead
                    </h2>

                    <p className="font-[var(--font-body)] text-xs uppercase tracking-widest">
                        News without noise.
                    </p>

                </div>

            </footer>

        </main>
    );
}