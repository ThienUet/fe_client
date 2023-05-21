import React from 'react';
import dynamic from 'next/dynamic';
const ProfilePage = dynamic(() => import('../../app/Account/Profile'), { ssr: false });

export default function index({ user, userRefetch }) {
  return (
    <div>
      <ProfilePage user={user} userRefetch={userRefetch} />
    </div>
  );
}
