import React, { Dispatch } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Divider, Input, Select, Space, Button, Radio } from 'antd';
import type { InputRef } from 'antd';
import { HouseListParams } from 'type/house';
import { SetStateAction } from 'jotai';
import HouseType from './house-type';
import PlacesAutocomplete from '../auto-complete';
import style from './style.module.scss';
import HouseFor from './house-for';
import HousePrice from './house-price';
import HouseRoom from './house-room';

interface Props {
  params: HouseListParams;
  setParams: Dispatch<SetStateAction<HouseListParams>>;
}

const CustomFilter = ({ params, setParams }: Props) => {
  const handleChangePlace = ({ lat, lng, address }) => {
    setParams({
      ...params,
      mapPoint: `${lng},${lat}`,
    });
  };

  const handleChange = (subParams: any) => {
    setParams({
      ...params,
      ...subParams,
    });
  };

  return (
    <div
      className={style.filterContainer}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      <PlacesAutocomplete handleChangePlace={handleChangePlace} />
      <HouseFor params={params} handleChange={handleChange} />
      <HousePrice params={params} handleChange={handleChange} />
      <HouseRoom params={params} handleChange={handleChange} />
      <HouseType params={params} handleChange={handleChange} />
    </div>
  );
};

export default CustomFilter;
