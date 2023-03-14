import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta charSet='utf-8' />
        <meta name='google' content='notranslate' />
        <meta httpEquiv='Content-Security-Policy' content='upgrade-insecure-requests' />
        <link href='/static/logo/logo.png' rel='shortcut icon' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
