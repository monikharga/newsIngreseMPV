import clientPromise from '@/lib/mongodb'
import { item } from '@/lib/rssparse';
import { Summer } from './ai';
export  async function AiSum() {

    const client = await clientPromise;
    const db = client.db("rssnews")
    const coll = db.collection<item>("news")

    const article=await coll.find({},{projection:{_id:0,content:1,title:1,pubdate:1,guid:1}}).toArray()
    // console.log("article is : ",article[0]);
//    Summer(article)
      
    // const ite:item=article[0]
   const sum= await Summer()
   console.log("arrt is ",sum);
   
return article
}