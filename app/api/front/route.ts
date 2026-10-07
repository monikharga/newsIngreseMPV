import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import getClient from "@/lib/mongodb";

function uriFingerprint() {
    const uri = process.env.MONGODB_URI?.trim();
    if (!uri) return "MONGODB_URI missing";
    try {
        const u = new URL(uri);
        return `user=${u.username} host=${u.hostname} len=${uri.length} sha=${createHash("sha256").update(uri).digest("hex").slice(0, 16)}`;
    } catch {
        return `unparseable len=${uri.length} sha=${createHash("sha256").update(uri).digest("hex").slice(0, 16)}`;
    }
}

export async function GET(req: Request) {
    try {

        const client = await getClient();
        const db = client.db("rssnews")
        const coll = db.collection("ainews")
        console.log(await coll.countDocuments());
        
        const arr = await coll.find({}, {
            projection: {
                _id: 1,
                title: 1,
                content: 1,
                pubdate: 1,
                guid: 1
            }
        }).toArray()

        return NextResponse.json({ message: "hello", arr })
    } catch (err) {
        console.log("uri fingerprint:", uriFingerprint());
        console.log(err instanceof Error ? `${err.name}: ${err.message}` : err);

        return NextResponse.json({ message: "error is " }, { status: 500 })
    }
}