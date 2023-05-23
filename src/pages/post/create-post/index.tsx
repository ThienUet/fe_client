import dynamic from 'next/dynamic';
import React from 'react';
import { User } from 'type/user';
const PostComponent = dynamic(() => import('../../../app/Account/post/index'), { ssr: false });

interface Props {
  user: User;
}

const CreateHouse = ({ user }: Props) => {
  return (
    <>
      <PostComponent user={user} />
    </>
  );
};

export default CreateHouse;
