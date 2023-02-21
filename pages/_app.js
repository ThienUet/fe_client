import 'bootstrap/dist/css/bootstrap.css';
import '../public/libs/font-awesome/css/font-awesome.min.css';
import { useEffect } from 'react';
import '../styles/index.scss';

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
