import client from '@/lib/mongodb'
import axios from 'axios'
import Parser from 'rss-parser'
import { NextResponse } from "next/server"
import clientPromise from '@/lib/mongodb'
import {AiSum} from './sum'


export type item = {
    content: string,
    title: string,
    pubdate: Date,
    guid: string
}

const parser = new Parser()
export async function ParseRss() {
    const arr: item[] = []
    try {
        const client = await clientPromise;
        const db = client.db("rssnews")
        const coll = db.collection("news")
        // parse RSS feed
        const res = await axios.get("https://feeds.feedburner.com/gadgets360-latest")
        const feed = await parser.parseString(res.data)

        const val = await coll.countDocuments()
        // console.log(await coll.countDocuments())

        const articles = feed.items.map((e, i) => {
            return ({
                content: e.content,
                title: e.title,
                pubdate: e.pubDate,
                guid: e.guid
            })
        })

        const artgui = articles.map((e) => e.guid)


        const dbguid = (await coll.find(
            { guid: { $in: artgui } },
            { projection: { guid: 1, _id: 0 } }
        ).toArray()).map((e) => e.guid)

        const newart = articles.filter((e) => !dbguid.includes(e.guid))


        const fift = newart.slice(0, 15)
        // console.log("gui", fift.length)

        if (fift.length === 0) return NextResponse.json({ message: "full" })
        await coll.insertMany(fift)

       await AiSum()

        return NextResponse.json({ message: "fetch success", feed })
    } catch (err) {
        console.error("fetching issue ", err)
        return NextResponse.json({ message: "Server error" }, { status: 500 })
    }
}