import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
const ContactPage = dynamic(() => import('../app/Contact/ContactV'), {ssr: false});
const contact = (props) => {
  return (
    <>
        <Head>
            <title>Liên hệ</title>
        </Head>
        <div className='main-app'>
            <ContactPage />
        </div>
    </>
  )
}
export default withRouter(contact);
