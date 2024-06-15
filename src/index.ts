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

    review(parent, args, context) {
      // .find method will return the first element that satisfies the return expression
      return db.reviews.find((review) => {
        return review.id == args.id;
      });
    },
    game(parent, args, context) {
      // .find method will return the first element that satisfies the return expression
      return db.games.find((game) => {
        return game.id == args.id;
      });
    },
    author(parent, args, context) {
      // .find method will return the first element that satisfies the return expression
      return db.authors.find((author) => {
        return author.id == args.id;
      });
    },
  },

  Game: {
    // this will run after the resolver for game(){} get executed and it will use this reslover to populate the reviews with the same parent.id which is the same as game_id from reviews object
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id == parent.id);
    },
  },
  Review: {
    game(parent) {
      return db.games.find((g) => g.id == parent.game_id);
    },
    author(parent) {
      return db.authors.find((author) => author.id == parent.author_id);
    },
  },
  Author: {
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id == parent.id);
    },

  },    Mutation: {
    deleteGame(parent, args, context) {
      db.games = db.games.filter((game) => game.id !== args.id);
      return db.games;
    },
    addGame(_, args) {
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 1000).toString(),
      };
      // math.random will return a number from 0 inclusive to 1 exclusive
      db.games.push(game);
      return game;
    },
    editGame(_, args) {
      let index = db.games.findIndex((g) => g.id == args.id);

      if (index === -1) {
        throw new Error("Game not found");
      }
      db.games[index] = { ...db.games[index], ...args.edits };
      return db.games[index];
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
let port = 3002;
const { url } = await startStandaloneServer(server, {
  listen: { port },
});
console.log(`Server started at: ${url}`);
