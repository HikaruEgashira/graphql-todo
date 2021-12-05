import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer } from "apollo-server-micro";
import { resolvers } from "~/bff";
import { initServer } from "~/bff/auth";
// @ts-ignore
import typeDefs from "graphql/schema.gql";
import type { Context } from "~/bff/type";
import admin from "firebase-admin";

export const config = {
  api: {
    bodyParser: false,
  },
};

initServer();

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
        const user = await admin.auth().verifyIdToken(token);

        return {
          id: user.uid,
          email: user.email ?? "",
          name: user.name ?? "",
          photoURL: user.picture ?? "",
        };
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
