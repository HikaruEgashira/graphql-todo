import { auth } from "~/service/admin";
import type { MutationResolvers } from "./gen";
import { Context } from "./type";

export const Mutation: MutationResolvers<Context> = {
  async dummy(_parent, _args, context, _info) {
    if (context.user) {
      throw new Error("need auth");
    }
    return { error: false };
  },
};
