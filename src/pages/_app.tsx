import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { createClient } from "~/app/client";
import { initAuth } from "~/service/auth";
import { useAuthUser } from "next-firebase-auth";
import { ToastContainer } from "react-toastify";

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  const authUser = useAuthUser();
  const client = createClient(authUser);

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-center"
        hideProgressBar
        autoClose={2000}
      />
    </ApolloProvider>
  );
}

export default MyApp;
