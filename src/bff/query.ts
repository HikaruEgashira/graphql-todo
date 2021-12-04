import { QueryResolvers } from "./gen";
import { Context } from "./type";

export const Query: QueryResolvers<Context> = {
  async todo(_parent, { id }, context, _info) {
    if (!context.user) throw new Error("Not authenticated");

    return { id, title: `hello ${context.user.claims.provider_id}` };
  },
  async todos(_parent, _args, context, _info) {
    if (!context.user) throw new Error("Not authenticated");

    return [{ id: "ok", title: `hello ${context.user.claims.provider_id}` }];
  },
};
