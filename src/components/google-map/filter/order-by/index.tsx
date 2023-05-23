import { Select } from 'antd';
import React from 'react';
import { HouseListParams } from 'type/house';

interface Props {
  params: HouseListParams;
  handleChange: any;
}

const OrderByFilter = ({ params, handleChange }: Props) => {
  const handleOnChange = (e: string) => {
    handleChange({ sortBy: e });
  };

  return (
    <Select
      style={{ width: 200 }}
      defaultValue=''
      placeholder='sắp xếp theo'
      options={[
        { value: 'created_date', label: 'Ngày tạo' },
        { value: 'price', label: 'Giá' },
        { value: 'distanceToPoint', label: 'Khoảng cách' },
      ]}
      value={params.sortBy ? params.sortBy : null}
      onChange={handleOnChange}
    />
  );
};

export default OrderByFilter;
