import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SocialBarRelative from '../../components/SocialBarRelative/SocialBarRelative';
import { Divider } from 'antd';
import  HelpP from './_components/HelpP';
export default function ContactV() {
  return (
    <div className='help-page'>
      <Header />
      <Divider />
      <HelpP />
      <Divider />
      <Footer />
      <SocialBarRelative />
    </div>
  );
}
