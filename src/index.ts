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

    review(parent,args,context){
        // .find method will return the first element that satisfies the return expression
        return db.reviews.find((review)=>{
            return review.id ==args.id 
        })
    },
    game(parent,args,context){
        // .find method will return the first element that satisfies the return expression
        return db.games.find((game)=>{
            return game.id ==args.id 
        })
    },
    author(parent,args,context){
        // .find method will return the first element that satisfies the return expression
        return db.authors.find((author)=>{
            return author.id ==args.id 
        })
    }
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