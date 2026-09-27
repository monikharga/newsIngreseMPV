"use client";

import { useRouter } from "next/navigation";

export default function LoadMore({
  page,
  hasMore,
}: {
  page: number;
  hasMore: boolean;
}) {
  const router = useRouter();

  if (!hasMore) return null;

  return (
    <button
      onClick={() => router.push(`/?p=${page + 1}`, { scroll: false })}
      className="col-span-full mt-4 border-2 border-[#241B2F] bg-[#241B2F] px-6 py-3 font-[var(--font-body)] text-sm font-bold text-[#D7F36A] transition hover:bg-[#B63872]"
    >
      Load more stories
    </button>
  );
}