import { MongoClient } from "mongodb";
import dns from 'dns';
dns.setServers(["192.168.50.156"]);
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

const client = new MongoClient(uri);

const clientPromise = client.connect();

export default clientPromise;