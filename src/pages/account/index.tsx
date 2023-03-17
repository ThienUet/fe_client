import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const ProfilePage = dynamic(() => import('../../app/Account/Profile'), { ssr: false });
export default function index(props) {
  return (
    <div>
      <ProfilePage {...props} />
    </div>
  );
}
