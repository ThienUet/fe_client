import { Radio, Select } from 'antd';
import { SetStateAction } from 'jotai';
import React, { Dispatch } from 'react';
import { HouseListParams } from 'type/house';

interface Props {
  params: HouseListParams;
  handleChange: any;
}

const HouseRoom = ({ params, handleChange }: Props) => {
  const handleOnChange = (e: any) => {
    const { name, value } = e.target;
    const newValue = value === 'any' ? '' : value;
    handleChange({ [name]: newValue });
  };

  return (
    <Select
      style={{ width: 200 }}
      value='1'
      options={[{ value: '1', label: 'Beds and Baths' }]}
      dropdownMatchSelectWidth={false}
      dropdownRender={() => {
        return (
          <div>
            <p>Number of bedrooms</p>
            <div style={{ padding: '8px' }}>
              <div>
                <p style={{ margin: '0px' }}>Bedrooms</p>
                <div>
                  <Radio.Group
                    defaultValue='any'
                    buttonStyle='solid'
                    value={params.bedRoomGte ? params.bedRoomGte : 'any'}
                    name='bedRoomGte'
                    onChange={handleOnChange}
                  >
                    <Radio.Button value='any'>Any</Radio.Button>
                    <Radio.Button value={1}>1+</Radio.Button>
                    <Radio.Button value={2}>2+</Radio.Button>
                    <Radio.Button value={3}>3+</Radio.Button>
                    <Radio.Button value={4}>4+</Radio.Button>
                    <Radio.Button value={5}>5+</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
              <div style={{ marginTop: '8px' }}>
                <p style={{ margin: '0px' }}>Bathrooms</p>
                <div>
                  <Radio.Group
                    defaultValue='any'
                    buttonStyle='solid'
                    value={params.bathRoomGte ? params.bathRoomGte : 'any'}
                    name='bathRoomGte'
                    onChange={handleOnChange}
                  >
                    <Radio.Button value='any'>Any</Radio.Button>
                    <Radio.Button value={1}>1+</Radio.Button>
                    <Radio.Button value={2}>2+</Radio.Button>
                    <Radio.Button value={3}>3+</Radio.Button>
                    <Radio.Button value={4}>4+</Radio.Button>
                    <Radio.Button value={5}>5+</Radio.Button>
                  </Radio.Group>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    ></Select>
  );
};

export default HouseRoom;
