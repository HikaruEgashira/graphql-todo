import "~/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { createClient } from "~/app/client";
import { ToastContainer } from "react-toastify";
import { initClient } from "~/app/auth";

initClient();

function MyApp({ Component, pageProps }: AppProps) {
  const client = createClient();

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
