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

// app.get("/ads", async (req, res) => {
//   // /ads?category=1 => req.query.category = 1
//   let findOptions: FindManyOptions<Ad> = {
//     relations: { category: true, tags: true },
//   };
//   if (req.query.category !== undefined) {
//     findOptions = {
//       ...findOptions,
//       where: {
//         category: { id: Number.parseInt(req.query.category as string) },
//       },
//     };
//   }
//   if (req.query.search !== undefined) {
//     console.log("search query", req.query.search);
//     findOptions = {
//       ...findOptions,
//       where: { title: ILike(`%${req.query.search}%`) },
//     };
//   }
//   const allAds = await Ad.find(findOptions);
//   res.send(allAds);
// });

// app.get("/ads/:id", async (req, res) => {
//   const result = await Ad.findOneByOrFail({
//     id: Number.parseInt(req.params.id),
//   });
//   res.send(result);
// });

// app.delete("/ads/:id", async (req, res) => {
//   try {
//     await Ad.delete({ id: Number.parseInt(req.params.id) });
//     res.send("Ad has been removed");
//   } catch (err) {
//     console.log("err", err);
//     res.status(500).send(err);
//   }
// });

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
