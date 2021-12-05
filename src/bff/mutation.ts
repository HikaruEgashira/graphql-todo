import type { MutationResolvers } from "./gen";
import type { Context } from "./type";
import { addTodo, removeTodo, todos, users } from "./ogm";
import { get, remove, set, update } from "typesaurus";

export const Mutation: MutationResolvers<Context> = {
  createUser: async (_parent, _args, ctx, _info) => {
    if (!ctx?.id || !ctx.email) throw new Error("Not authenticated");
    const { id: userId, email } = ctx;

    await set(users, userId, { email: email });

    return { message: "User created" };
  },
  addTodo: async (_parent, args, ctx, _info) => {
    if (!ctx?.id) throw new Error("Not authenticated");
    const userId = ctx.id;

    const todoRef = await addTodo(userId, {
      title: args.title,
      completed: false,
    });

    return { message: todoRef.id + " added" };
  },
  deleteTodo: async (_parent, args, ctx, _info) => {
    if (!ctx?.id) throw new Error("Not authenticated");
    const userId = ctx.id;

    const todo = await get(todos(userId), args.id);
    if (!todo?.ref) return null;

    await removeTodo(userId, todo.ref); // referenceを消す
    await remove(todo.ref); // todo本体も消す

    return { message: todo.ref.id + " deleted" };
  },
  updateTodo: async (_parent, args, ctx, _info) => {
    if (!ctx?.id) throw new Error("Not authenticated");
    const userId = ctx.id;

    await update(todos(userId), args.id, {
      completed: args.completed ?? undefined,
    });

    return null;
  },
  dummy: async (_parent, _args, ctx, _info) => {
    if (!ctx?.id) throw new Error("Not authenticated");

    return { message: "dummy" };
  },
};
