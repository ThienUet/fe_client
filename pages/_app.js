import 'bootstrap/dist/css/bootstrap.css';
import '../public/libs/font-awesome/css/font-awesome.min.css';
import React, { useEffect, useState } from 'react';
import '../styles/index.scss';
import Head from 'next/head';
import { Router, useRouter } from 'next/router';
import { useUser } from '@/libs/auth-service';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import PageLoader from '../components/loader';
const LayoutApp = ({Component, ...rest}) => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <>
      <Component {...rest} user={user} />
    </>
  )
}


export default function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    }
    const end = () => {
      setLoading(false);
    }
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.on('routeChangeStart', start);
      Router.events.on('routeChangeComplete', end);
      Router.events.on('routeChangeError', end);
    } 
  }, []);

  return typeof window !== undefined ? (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ConfigProvider>
          {
            loading ? <PageLoader showText={true} /> : <LayoutApp {...pageProps} Component={Component} />
          }
        </ConfigProvider>
      </Hydrate>
    </QueryClientProvider>
  ): null
}