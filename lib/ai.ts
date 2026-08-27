import { item } from "@/lib/rssparse"
import { GoogleGenAI } from "@google/genai"
import { console } from "inspector";
import getClient from "@/lib/mongodb"
import { json } from "stream/consumers";

const ai = new GoogleGenAI({
    apiKey: process.env.API_KEY
})

export async function Summer() {
    try {
        const client = await getClient();
        const db = client.db("rssnews")
        const coll = db.collection<item>("ainews")
        const coll2 = db.collection<item>("news")

        const store = await coll.find({},{projection:{guid:1,_id:0}}).toArray()

        const sguid = store.map((e) => e.guid)
        const cguid = await (coll2.find({ guid: { $nin: sguid } }, { projection: { _id: 0 } })).toArray()
       
        for (const article of cguid.splice(0,3)) {
            console.log("item is : ", article);
            const res = await ai.models.generateContent({
                model: "gemini-3.6-flash",
                contents: `You are a news editor.

                Create:
                1. A short catchy headline (maximum 15 words) don't copy headline from other source make or change diffrently headline .
                2. A concise summary (maximum 150 words)

                Rules:
                - Only use information provided in the article.
                - Do not add facts or opinions.
                - Do not use markdown.
                - Do not create sections or bullet points.
                - if need spearate it with paragraph wise for redabilty
                - Return ONLY valid JSON in this format:

                {
                  "title": "short headline",
                  "content": "concise summary"
                }
                    Title: ${article.title}
                    Description: ${article.content}`
            })
            const air=JSON.parse(res.text)
            await coll.insertOne({
                content:air.content,
                title:air.title,
                guid:article.guid,
                pubdate:new Date(article.pubdate)

            })
            console.log("rss text is : ", res.text);
        }



        return cguid.length;
    } catch (err) {
        console.error("sever is ", err)
        return err;
    }

}