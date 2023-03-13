import "../styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/icons/favicon-32x32.png" />
        <title>Vizercise | Exercises Visualized with Interactive Body Maps</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
