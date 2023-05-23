import { Select } from 'antd';
import React from 'react';
import { HouseListParams } from 'type/house';

interface Props {
  params: HouseListParams;
  handleChange: any;
}

const OrderByFilter = ({ params, handleChange }: Props) => {
  return (
    <Select
      style={{ width: 200 }}
      defaultValue=''
      options={[
        { value: 'created_date', label: 'Ngày tạo' },
        { value: 'price', label: 'Giá' },
        { value: 'distanceToPoint', label: 'Khoảng cách' },
      ]}
      value={params.sortOrder ? params.sortOrder : null}
      onChange={handleChange}
    />
  );
};

export default OrderByFilter;
