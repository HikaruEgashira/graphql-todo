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
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).send("Unauthorized");

  const user = await verifyIdToken(token);
  const context: Context = {
    token,
    user,
  };

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => context,
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
