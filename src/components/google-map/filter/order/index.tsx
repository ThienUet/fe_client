import { Select } from 'antd';
import React from 'react';
import { HouseListParams } from 'type/house';

interface Props {
  params: HouseListParams;
  handleChange: any;
}

const OrderFilter = ({ params, handleChange }: Props) => {
  const handleOnChange = (e: string) => {
    handleChange({ sortOrder: e });
  };

  return (
    <Select
      style={{ width: 200 }}
      defaultValue=''
      placeholder='Thứ tự'
      options={[
        { value: 'asc', label: 'Tăng dần' },
        { value: 'desc', label: 'Giảm dần' },
      ]}
      value={params.sortOrder ? params.sortOrder : null}
      onChange={handleOnChange}
    />
  );
};

export default OrderFilter;
