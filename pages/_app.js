import "../styles/global.scss";
import Head from "next/head";
import { SSRProvider } from "react-bootstrap";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SSRProvider>
        <Layout>
          <Head>
            <title>BaeEvents</title>
            <meta
              name="description"
              content="Find a lot of great events that allow you to evolve"
            />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </SSRProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
