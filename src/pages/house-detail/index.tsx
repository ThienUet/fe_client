import dynamic from 'next/dynamic';
const HomeDetail = dynamic(() => import('../../app/House/HouseDetail'), { ssr: false });
import React from 'react';
import { User } from 'type/user';
interface Props {
  user: User;
}

const HouseDetail = ({ user }: Props) => {
  return <HomeDetail myInfo={user} />;
};
export default HouseDetail;
