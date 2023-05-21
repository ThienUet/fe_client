import React from 'react';
import Footer from '../../components/Footer/Footer';
import { Divider } from 'antd';
import HelpP from './_components/HelpP';
export default function ContactV() {
  return (
    <div className='help-page'>
      <Divider />
      <HelpP />
      <Divider />
      <Footer />
    </div>
  );
}
