import React, { Dispatch, useEffect } from 'react';
import { HouseListParams } from 'type/house';
import { SetStateAction } from 'jotai';
import HouseType from './house-type';
import HouseFor from './house-for';
import HousePrice from './house-price';
import HouseRoom from './house-room';
import { useRouter } from 'next/router';

interface Props {
  params: HouseListParams;
  setParams: Dispatch<SetStateAction<HouseListParams>>;
}

const CustomFilter = ({ params, setParams }: Props) => {
  const router = useRouter();
  useEffect(() => {
    const { lat, lng, houseCategory } = router.query;
    handleChange({
      ...params,
      mapPoint: `${lng},${lat}`,
      houseCategory: houseCategory,
    });
  }, [router]);

  const handleChange = (subParams: any) => {
    setParams({
      ...params,
      ...subParams,
    });
  };

  return (
    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
      <HouseFor params={params} handleChange={handleChange} />
      <HousePrice params={params} handleChange={handleChange} />
      <HouseRoom params={params} handleChange={handleChange} />
      <HouseType params={params} handleChange={handleChange} />
    </div>
  );
};

export default CustomFilter;
