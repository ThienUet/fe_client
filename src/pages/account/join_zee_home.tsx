import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';

const MixPage = dynamic(() => import('../../app/Account/Mix/LoginRegister'), { ssr: false });

const Login = () => {
  return (
    <>
      <Head>
        <title>ZeeHome GO !</title>
      </Head>
      <div className='main-login-form'>
        <MixPage />
      </div>
    </>
  );
};

export default Login;
