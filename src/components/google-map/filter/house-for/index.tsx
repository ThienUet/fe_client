import { Select } from 'antd';
import React from 'react';
import { HouseListParams } from 'type/house';

interface Props {
  params: HouseListParams;
  handleChange: any;
}

const HouseFor = ({ params, handleChange }: Props) => {
  const handleOnChange = (value: any) => {
    handleChange({
      houseCategory: value,
    });
  };
  return (
    <Select
      style={{ width: 200 }}
      defaultValue='1'
      options={[
        { value: '1', label: 'For sell' },
        { value: '2', label: 'For lease' },
      ]}
      value={params.houseCategory ? params.houseCategory : null}
      onChange={handleOnChange}
    />
  );
};

export default HouseFor;
