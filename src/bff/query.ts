import type { QueryResolvers } from "./gen";
import type { Context } from "./type";

export const Query: QueryResolvers<Context> = {
  user: async (_parent, _args, ctx) => {
    if (!ctx) return null;
    return ctx.user.id;
  },
  todo: async (_parent, { id }, ctx, _info) => {
    if (!ctx) throw new Error("Not authenticated");
    return { id, title: `ユーザーのtodoを取得します` };
  },
  todos: async (_parent, _args, ctx, _info) => {
    if (!ctx) throw new Error("Not authenticated");
    return [{ id: "ok", title: `ユーザーのtodoを取得します` }];
  },
};
