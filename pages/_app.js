import 'bootstrap/dist/css/bootstrap.css';
import '../public/libs/font-awesome/css/font-awesome.min.css';
import { useEffect } from 'react';
import Script from 'next/script';
export default function App({ Component, pageProps }) {
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap");
},[])
  return (
  <>
    <Component {...pageProps} />
   
  </>
  )
}
