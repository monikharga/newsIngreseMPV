import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
export async function GET(req: Request) {
    try {

        const client = await clientPromise;
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
        console.log(err);

        return NextResponse.json({ message: "error is " }, { status: 500 })
    }
}