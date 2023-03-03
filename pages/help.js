import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
const HelpPage = dynamic(() => import('../app/Help/HelpV'), {ssr: false});
const Help = (props) => {
  return (
    <>
        <Head>
            <title>Liên hệ</title>
        </Head>
        <div className='main-app'>
            <HelpPage />
        </div>
    </>
  )
}
export default withRouter(Help);
