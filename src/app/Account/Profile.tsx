import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Divider } from 'antd';
import SocialBarRelative from '../../components/SocialBarRelative/SocialBarRelative';
import ProfileComponent from './_components/ProfileComponent';
import { useRouter } from 'next/router';

interface Props {
  user: any;
}

export default function Profile({ user }: Props) {
  const router = useRouter();
  return (
    <div className='main-profile'>
      <Header user={user} router={router} />
      <Divider />
      <div className='profile-content'>
        <ProfileComponent user={user} />
      </div>
      <Divider />
      <Footer />
      <SocialBarRelative />
    </div>
  );
}
