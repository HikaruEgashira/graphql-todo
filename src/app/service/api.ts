import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getAuth, User } from "firebase/auth";

const cache = new InMemoryCache();
/**
 * init state
 */
// cache.writeQuery({
//   query: gql`
//     query currentUser {
//       id
//     }
//   `,
//   data: {
//     id: "",
//   },
// });

export const createClient = () => {
  const httpLink = createHttpLink({
    uri: `api/graphql`,
    credentials: "include",
  });

  const authLink = setContext(async (_operation, { headers }) => {
    const user = await getUser();
    if (!user) return { headers };

    const token = await user.getIdToken();

    return {
      headers: {
        ...headers,
        authorization: token,
      },
    };
  });

  return new ApolloClient({
    link: from([authLink, httpLink]),
    cache,
  });
};

async function getUser() {
  const auth = getAuth();
  return await new Promise<User | null>((resolve) =>
    auth.onAuthStateChanged(resolve)
  );
}
