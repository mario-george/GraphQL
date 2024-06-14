import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import db from "./db.js";
import { typeDefs } from "./schema.js";
const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
let port = 3002
const {url} = await startStandaloneServer(server,{
    listen:{port}
}) 
console.log(`Server started at: ${url}`)