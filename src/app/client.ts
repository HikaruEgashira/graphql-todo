import {
  ApolloClient,
  createHttpLink,
  from,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthUser } from "next-firebase-auth";

const cache = new InMemoryCache();
/**
 * init state
 */
cache.writeQuery({
  query: gql`
    query currentUser {
      id
    }
  `,
  data: {
    id: "",
  },
});

export const createClient = (authUser: AuthUser) => {
  const httpLink = createHttpLink({
    uri: `api/graphql`,
    credentials: "include",
  });

  const authLink = setContext(async (_operation, { headers }) => {
    const token = await authUser.getIdToken();
    return {
      ...headers,
      authorization: `Bearer ${token}`,
    };
  });

  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache,
  });
};
