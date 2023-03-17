import React from 'react';
import dynamic from 'next/dynamic';
const ProfilePage = dynamic(() => import('../../app/Account/Profile'), { ssr: false });
export default function index(props: JSX.IntrinsicAttributes & { user: any; userRefetch: any }) {
  return (
    <div>
      <ProfilePage {...props} />
    </div>
  );
}
