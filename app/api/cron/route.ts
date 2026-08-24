import { NextResponse } from "next/server";
import { AiSum } from "@/lib/sum";
import { ParseRss } from "@/lib/rssparse";

export async function GET(req: Request) {
    try {
        await ParseRss()
        await AiSum()
        return NextResponse.json({
            success: true,
            message: "Rss ai processing complete"
        })
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Cron failed"
            },
            { status: 500 }
        );
    }
}