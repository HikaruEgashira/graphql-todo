import { gql, Config } from "apollo-server-micro";

export const typeDefs: Config["typeDefs"] = gql`
  type Todo {
    id: String!
    title: String!
  }
  type Query {
    todo(id: String!): Todo
    todos: [Todo!]!
  }
`;
