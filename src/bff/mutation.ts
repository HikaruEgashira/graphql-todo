import { MutationResolvers, Result } from "./gen";
import type { Context } from "./type";

export const Mutation: MutationResolvers<Context> = {
  addTodo: async (_parent, _args, context, _info) => {
    if (!context) return { result: Result.Error };

    return { result: Result.Error };
  },
  deleteTodo: async (_parent, _args, context, _info) => {
    if (!context) return { result: Result.Error };

    return { result: Result.Error };
  },
  updateTodo: async (_parent, _args, context, _info) => {
    if (!context) return { result: Result.Error };

    return { result: Result.Error };
  },
  dummy: async (_parent, _args, context, _info) => {
    if (!context) return { result: Result.Error };

    return { result: Result.Success };
  },
};
