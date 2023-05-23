import dynamic from 'next/dynamic';
const HomeDetail = dynamic(() => import('../../app/House/HouseDetail'), { ssr: false });
import React from 'react';

interface Props {
  user: any;
}
const HouseDetail = ({ user }: Props) => {
  return <HomeDetail myInfo={user} />;
};
export default HouseDetail;
