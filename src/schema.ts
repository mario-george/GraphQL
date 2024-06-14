
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
const typeDefs = `#graphql
type Review{
id:ID!

}
type Game{

}
type Author {

}

type Query{
reviews:[Review]
games:[Game]
authors:[Author]
}
`
// type Query is mandatory you define main entrypoints to the graphql server