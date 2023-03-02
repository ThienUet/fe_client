import 'bootstrap/dist/css/bootstrap.css';
import '../public/libs/font-awesome/css/font-awesome.min.css';
import { useEffect } from 'react';
import '../styles/index.scss';
import Head from 'next/head';
export default function App({ Component, pageProps }) {
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap.js");
}, []);

  return typeof window !== undefined ? (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Component {...pageProps} />
  </>
  ): null
}