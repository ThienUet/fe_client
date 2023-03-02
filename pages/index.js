import React from 'react';
import Header from '@/components/Header/Header';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
//import through dynamic:  Deferred loading helps improve the initial 
//loading performance by decreasing the amount of JavaScript necessary to render the page.
const HomePage = dynamic(() => import('../components/Home/Home'), {ssr: false});

export default function Home() {
  return (
    <React.StrictMode>
      <div className='app'>
        <div className='main-app'>
          <HomePage />
        </div>
      </div>
    </React.StrictMode>
  )
}
