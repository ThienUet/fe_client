import Head from 'next/head';
import React from 'react';

export default function HeadTitle({ title }: { title: any }) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
