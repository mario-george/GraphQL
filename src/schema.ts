/* there are 5 scalar types in graphql but you can build custom types
Int ->whole numbers
Float -> decimal point numbers
ID ->special graphql type
Boolean -> boolean
String ->String
add ! after the end of the type to make it mandatory
[String] ->array of strings 
[String!]! ->mandatory array of strings

[String!], it means that the list itself can be null, 
but it can't have any null values in it. If you use ! after both the type and the list (like [String!]!), it means both the list and the items in the list will never be null.
*/
export const typeDefs = `#graphql
type Game{
id:ID!
title:String!
platform : [String!]!
reviews:[String!]
}
type Review{
id:ID!
rating:Int!
content:String!
game:Game!
author:Author!

}
type Author {
    id:ID!
name:String!
verified:Boolean!
reviews:[Review!]
}

type Query{
reviews:[Review]
games:[Game]
authors:[Author]
review(id:ID!):Review
game(id:ID!):Game
author(id:ID!):Author
}
type Mutation{
    deleteGame(id:ID!):[Game]
    addGame(game:AddGameInput!):Game
    editGame(id:ID!,edits:EditGameInput!):Game

}
input AddGameInput{
    title : String!
    platform:[String!]!
}
input EditGameInput{
    title:String
    platform:[String!]
}
`;
// type Query is mandatory you define main entrypoints to the graphql server
