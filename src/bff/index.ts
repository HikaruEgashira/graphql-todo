import { Mutation } from "./mutation";
import { Query } from "./query";
import type { Resolvers } from "./gen";
import type { Context } from "./type";

export const resolvers: Resolvers<Context> = {
  Query,
  Mutation,
};
