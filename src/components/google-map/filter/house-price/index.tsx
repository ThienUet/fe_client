import { Select } from 'antd';
import React from 'react';
import { HouseListParams } from 'type/house';

interface Props {
  params: HouseListParams;
  handleChange: any;
}

const options = [
  { value: '1000000', label: '1 triệu' },
  { value: '5000000', label: '5 triệu' },
  { value: '10000000', label: '10 triệu' },
  { value: '50000000', label: '50 triệu' },
  { value: '100000000', label: '100 triệu' },
  { value: '500000000', label: '500 triệu' },
  { value: '1000000000', label: '1 tỷ' },
  { value: '5000000000', label: '5 tỷ' },
  { value: '10000000000', label: '10 tỷ' },
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
      options={[{ value: '1', label: 'Giá' }]}
      dropdownRender={() => {
        return (
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <p>Mức giá</p>
            <div style={{ display: 'flex', padding: '8px 16px', gap: '8px' }}>
              <div>
                <p style={{ margin: '0px' }}>Tối thiểu</p>
                <Select
                  style={{ width: 120 }}
                  value={params.priceFrom ? params.priceFrom : null}
                  placeholder='Tối thiểu'
                  dropdownMatchSelectWidth={false}
                  options={options}
                  onChange={(_) => handleOnChange(_, 'priceFrom')}
                />
              </div>
              <div>
                <div>
                  <p style={{ margin: '0px' }}>Tối đa</p>
                  <Select
                    style={{ width: 120 }}
                    placeholder='Tối đa'
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
