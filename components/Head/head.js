import Head from 'next/head'
import React from 'react'

export default function HeadTitle({title}) {
  return (
    <Head>
       <title> {title}</title>
    </Head>
  )
}
