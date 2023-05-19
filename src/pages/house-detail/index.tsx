import dynamic from 'next/dynamic';
const HomeDetail = dynamic(() => import('../../app/House/HouseDetail'), { ssr: false });
import React from 'react';
const HouseDetail = () => {
  return <HomeDetail />;
};
export default HouseDetail;
