import React from 'react';
import { Radio, Select, Space } from 'antd';
import { HouseListParams } from 'type/house';

const options = [
  { value: 1, label: 'Căn hộ' },
  { value: 2, label: 'Nhà' },
  { value: 3, label: 'Đất' },
  { value: 4, label: 'Văn phòng' },
  { value: 5, label: 'Nhà trọ' },
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
        options={[{ value: '1', label: 'Loại BDS' }]}
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
