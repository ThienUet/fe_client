import 'bootstrap/dist/css/bootstrap.css';
import '../../public/libs/font-awesome/css/font-awesome.min.css';
import React, { useEffect, useMemo, useState } from 'react';
import '../styles/index.scss';
import { Router, useRouter } from 'next/router';
import { useUser } from '../libs/auth-service';
import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ConfigProvider, Spin } from 'antd';
import PageLoader from '../components/loader';
import { LoadScript } from '@react-google-maps/api';
import Header from 'components/Header/Header';
import { SyncOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
const loginPaths = '/account/join_zee_home';
const SocialBarRelative = dynamic(
  () => import('../components/SocialBarRelative/SocialBarRelative'),
  { ssr: false },
);
const antIcon = (
  <SyncOutlined
    style={{
      fontSize: 24,
    }}
    spin
    label='Vui lòng đợi ...'
  />
);

const LayoutApp = ({ Component, ...rest }: { Component: any }) => {
  const { user, refetch: userRefetch } = useUser();
  const router = useRouter();

  return (
    <>
      <LoadScript
        googleMapsApiKey={'AIzaSyAT-29Vo1xQZU4nCKMCgvKfRivVJ2KkHhU'}
        language='en'
        region='EN'
        version='weekly'
        libraries={['places']}
      >
        {router.pathname !== loginPaths ? <Header user={user} router={router} /> : null}
        <Component {...rest} userRefetch={userRefetch} user={user} />
        <SocialBarRelative />
      </LoadScript>
    </>
  );
};

export default function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  const [queryClient] = useState(() => new QueryClient());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.on('routeChangeStart', start);
      Router.events.on('routeChangeComplete', end);
      Router.events.on('routeChangeError', end);
    };
  }, []);

  return typeof window !== undefined ? (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ConfigProvider>
          {loading ? (
            <div
              style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <Spin tip='Loading' size='large' indicator={antIcon}></Spin>
            </div>
          ) : (
            <LayoutApp {...pageProps} Component={Component} />
          )}
        </ConfigProvider>
      </Hydrate>
    </QueryClientProvider>
  ) : null;
}
