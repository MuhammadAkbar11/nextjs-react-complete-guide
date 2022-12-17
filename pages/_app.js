import "../styles/global.scss";
import Head from "next/head";
import { SSRProvider } from "react-bootstrap";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "../components/layout/Layout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

function MyApp({ Component, pageProps }) {
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
          <Component {...pageProps} />;
        </Layout>
      </SSRProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
