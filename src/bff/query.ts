import type { QueryResolvers } from "./gen";
import type { Context } from "./type";
import { todos, users } from "./ogm";
import { all, get } from "typesaurus";

export const Query: QueryResolvers<Context> = {
  user: async (_parent, _args, ctx) => {
    if (!ctx?.id) throw new Error("Not authenticated");
    return ctx.id;
  },
  todo: async (_parent, { id }, ctx, _info) => {
    if (!ctx?.id) throw new Error("Not authenticated");

    const todo = await get(todos(ctx.id), id);
    if (!todo) throw new Error("Todo not found");

    return {
      ...todo.data,
      id: todo.ref.id,
    };
  },
  todos: async (_parent, _args, ctx, _info) => {
    if (!ctx?.id) throw new Error("Not authenticated");

    const user = await get(users, ctx.id);
    if (!user) throw new Error("User not found");

    const todoDoc = await all(todos(user.ref.id));
    return todoDoc.map((todo) => ({ ...todo.data, id: todo.ref.id }));
  },
};
