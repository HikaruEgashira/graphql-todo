import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-micro";
import { resolvers } from "~/bff";
import { initAuth } from "~/service/auth";
// @ts-ignore
import typeDefs from "graphql/schema.gql";
import { verifyIdToken } from "next-firebase-auth";
import type { Context } from "~/bff/type";

export const config = {
  api: {
    bodyParser: false,
  },
};

initAuth();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async (): Promise<Context> => {
      try {
        const token = req.headers["authorization"];
        if (!token) return null;
        const user = await verifyIdToken(token);
        return { user };
      } catch (error) {
        return null;
      }
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        settings: {
          "request.credentials": "include",
          "editor.reuseHeaders": true,
        },
      }),
    ],
  });

  await apolloServer.start();
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}
