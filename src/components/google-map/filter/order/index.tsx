import { Select } from 'antd';
import React from 'react';
import { HouseListParams } from 'type/house';

interface Props {
  params: HouseListParams;
  handleChange: any;
}

const OrderFilter = ({ params, handleChange }: Props) => {
  return (
    <Select
      style={{ width: 200 }}
      defaultValue=''
      options={[
        { value: 'asc', label: 'Tăng dần' },
        { value: 'desc', label: 'Giảm dần' },
      ]}
      value={params.sortBy ? params.sortBy : null}
      onChange={handleChange}
    />
  );
};

export default OrderFilter;
