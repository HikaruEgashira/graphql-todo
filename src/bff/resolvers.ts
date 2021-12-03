import { Config } from "apollo-server-micro";

export const resolvers: Config["resolvers"] = {
  Query: {
    todo: async (_: any, { id }: { id: string }): Promise<never> => {
      throw new Error("Not implemented");
    },
    todos: async (): Promise<never[]> => {
      throw new Error("Not implemented");
    },
  },
};
