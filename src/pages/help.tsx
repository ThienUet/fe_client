import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
const HelpPage = dynamic(() => import('../app/Help/HelpV'), { ssr: false });
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Help = (props: any) => {
  return (
    <>
      <Head>
        <title>Câu hỏi thường gặp</title>
      </Head>
      <div className='main-app'>
        <HelpPage />
      </div>
    </>
  );
};
export default withRouter(Help);
