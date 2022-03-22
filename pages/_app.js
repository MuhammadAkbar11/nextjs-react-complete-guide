import Head from "next/head";
import Layout from "../components/layout/Layout";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default MyApp;
