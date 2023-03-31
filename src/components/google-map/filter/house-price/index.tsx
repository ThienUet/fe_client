import { Select } from 'antd';
import { SetStateAction } from 'jotai';
import React, { Dispatch } from 'react';
import { HouseListParams } from 'type/house';

interface Props {
  params: HouseListParams;
  handleChange: any;
}

const options = [
  { value: '100', label: '100 vnd' },
  { value: '200', label: '200 vnd' },
  { value: '300', label: '300 vnd' },
  { value: '400', label: '400 vnd' },
];

const HousePrice = ({ params, handleChange }: Props) => {
  const handleOnChange = (value: any, name: string) => {
    handleChange({
      [name]: value,
    });
  };

  return (
    <Select
      style={{ width: 200 }}
      dropdownMatchSelectWidth={false}
      value='1'
      options={[{ value: '1', label: 'Price' }]}
      dropdownRender={() => {
        return (
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <p>Price Range</p>
            <div style={{ display: 'flex', padding: '8px 16px', gap: '8px' }}>
              <div>
                <p style={{ margin: '0px' }}>Minimum</p>
                <Select
                  style={{ width: 120 }}
                  value={params.priceFrom ? params.priceFrom : null}
                  placeholder='No Min'
                  dropdownMatchSelectWidth={false}
                  options={options}
                  onChange={(_) => handleOnChange(_, 'priceFrom')}
                />
              </div>
              <div>
                <div>
                  <p style={{ margin: '0px' }}>Maximum</p>
                  <Select
                    style={{ width: 120 }}
                    placeholder='No Max'
                    dropdownMatchSelectWidth={false}
                    options={options}
                    value={params.priceTo ? params.priceTo : null}
                    onChange={(_) => handleOnChange(_, 'priceTo')}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }}
    ></Select>
  );
};

export default HousePrice;
