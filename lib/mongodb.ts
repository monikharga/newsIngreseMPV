import { MongoClient } from "mongodb";
import dns from "node:dns";

// Node picks its resolver from the OS. On Windows the WSL virtual adapter has
// the lowest interface metric and no DNS servers, so Node can end up with
// 127.0.0.1 where nothing is listening — every mongodb+srv:// SRV lookup then
// fails with "querySrv ECONNREFUSED". Windows' own resolver falls back across
// adapters; Node's does not. Only override when we detect that broken state,
// so hosted environments (Vercel) keep their platform resolver.
const configured = process.env.DNS_SERVERS?.split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const isBroken = (servers: string[]) =>
  servers.length === 0 || servers.every((s) => s.startsWith("127.") || s === "::1");

// `dns` and `dns.promises` keep separate resolver lists, and the driver's SRV
// lookup goes through `dns.promises` — so both have to be set.
for (const resolver of [dns, dns.promises]) {
  if (configured?.length) {
    resolver.setServers(configured);
  } else if (isBroken(resolver.getServers())) {
    resolver.setServers(["8.8.8.8", "1.1.1.1"]);
  }
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

// A module-level `client.connect()` caches its rejection forever: one transient
// DNS or network blip and every request 500s until the process restarts. Keep
// the successful connection cached, but let a failed one be retried.
const globalForMongo = globalThis as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

export default function getClient(): Promise<MongoClient> {
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch(
      (err) => {
        globalForMongo._mongoClientPromise = undefined;
        throw err;
      },
    );
  }
  return globalForMongo._mongoClientPromise;
}
