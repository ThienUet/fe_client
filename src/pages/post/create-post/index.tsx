import dynamic from 'next/dynamic';
import React from 'react';
const PostComponent = dynamic(() => import('../../../app/Account/post/index'), { ssr: false });
const CreateHouse = () => {
  return (
    <>
      <PostComponent />
    </>
  );
};

export default CreateHouse;
