import React from 'react';
import { Radio, Select, Space } from 'antd';
import { HouseListParams } from 'type/house';

const options = [
  { value: 1, label: 'Apartments' },
  { value: 2, label: 'Houses' },
  { value: 3, label: 'Lots/Land' },
  { value: 4, label: 'Condos/Co-ops' },
  { value: 5, label: 'Motels' },
];

interface Props {
  handleChange: ({ houseType }: { houseType: 1 | 2 | 3 | 4 | 5 }) => void;
  params: HouseListParams;
}

const HouseType = ({ handleChange, params }: Props) => {
  const onChange = (e: any) => {
    handleChange({
      houseType: e.target.value,
    });
  };

  return (
    <>
      <Select
        value='1'
        options={[{ value: '1', label: 'House Type' }]}
        dropdownMatchSelectWidth={false}
        dropdownStyle={{ width: '300px', padding: '16px' }}
        dropdownRender={() => {
          return (
            <div>
              <Radio.Group onChange={onChange} value={params.houseType}>
                <Space direction='vertical'>
                  {options.map((item, index) => {
                    return (
                      <Radio key={index} value={item.value}>
                        {item.label}
                      </Radio>
                    );
                  })}
                </Space>
              </Radio.Group>
            </div>
          );
        }}
      ></Select>
    </>
  );
};

export default HouseType;
