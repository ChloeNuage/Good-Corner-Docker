import "reflect-metadata";
import dataSource from "./config/data-source";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";
const port = 3000;

async function waitForDatabase(retries = 10, delay = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      await dataSource.initialize();
      console.log("✅ Connected to the database");
      return;
    } catch (err) {
      console.log(`⏳ Waiting for database... (${i + 1}/${retries})`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  console.error("❌ Could not connect to the database.");
  process.exit(1);
}

async function startServer() {
  await waitForDatabase();
/*   await dataSource.initialize(); */
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
  });
  const apolloServer = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port },
  });
  console.info("🚀 Server started on " + url);
}
startServer();
