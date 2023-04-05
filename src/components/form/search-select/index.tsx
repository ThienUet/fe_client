import { Select } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import React, { useState } from 'react';

interface Props {
  onChange?: any;
  value?: any;
  options: {
    value: string;
    label: string;
  }[];
  placeholder: string;
  isDisable?: boolean;
}

const DebounceSelect = ({ value, onChange, options, isDisable, placeholder }: Props) => {
  const onSelectChange = (value: string | number) => {
    onChange(value);
  };

  return (
    <Select
      showSearch
      placeholder={placeholder}
      disabled={isDisable}
      optionFilterProp='children'
      onChange={onSelectChange}
      filterOption={(input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      options={options}
    />
  );
};

export default DebounceSelect;
