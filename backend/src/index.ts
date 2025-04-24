import "reflect-metadata";
import dataSource from "./config/db";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import AdResolver from "./resolvers/AdResolver";
import CategoryResolver from "./resolvers/CategoryResolver";
import TagResolver from "./resolvers/TagResolver";
const port = 3000;

async function startServer() {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [AdResolver, CategoryResolver, TagResolver],
  });
  const apolloServer = new ApolloServer({ schema: schema });
  const { url } = await startStandaloneServer(apolloServer, {
    listen: { port },
  });
  console.info("Server started on " + url);
}
startServer();

// app.put("/ads/:id", async (req, res) => {
//   try {
//     const adIdToUpdate = Number.parseInt(req.params.id);
//     console.log(adIdToUpdate);
//     const adToUpdate = await Ad.findOneByOrFail({ id: adIdToUpdate });
//     Ad.merge(adToUpdate, req.body);
//     adToUpdate.tags = req.body.tags
//       ? req.body.tags.map((el: string) => ({ id: Number.parseInt(el) }))
//       : adToUpdate.tags;
//     await adToUpdate.save();
//     res.send("Ad has been updated");
//   } catch (err) {
//     console.log("err", err);
//     res.status(500).send(err);
//   }
// });
