import { Select } from 'antd';
import React from 'react';
import { HouseListParams } from 'type/house';

interface Props {
  params: HouseListParams;
  handleChange: any;
}

const DistanceFilter = ({ params, handleChange }: Props) => {
  return (
    <Select
      style={{ width: 200 }}
      defaultValue={1}
      options={[
        { value: 1, label: '1 km' },
        { value: 2, label: '2 km' },
        { value: 3, label: '3 km' },
        { value: 4, label: '4 km' },

        { value: 5, label: '5 km' },
        { value: 6, label: '6 km' },
        { value: 7, label: '7 km' },
        { value: 8, label: '8 km' },
        { value: 9, label: '9 km' },
        { value: 10, label: '10 km' },
      ]}
      value={params.distance ? params.distance : null}
      onChange={handleChange}
    />
  );
};

export default DistanceFilter;
