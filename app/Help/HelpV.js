import React from 'react'
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import SocialBarRelative from '@/components/SocialBarRelative/SocialBarRelative';
import HelpBody from './_components/index';
import { Divider } from 'antd';
export default function HelpV() {
  return (
    <div className='contact-page'>
        <Header />
        <Divider/>
        <HelpBody />
        <Divider/>
        <Footer />
        <SocialBarRelative/>
    </div>
  )
}
