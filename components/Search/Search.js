import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
const mockVal = (str, repeat = 1) => ({
    value: str.repeat(repeat),
  });
export default function Search() {
    const [value, setValue] = useState();
    const [options, setOptions] = useState();
    const getPanelValue = (searchText) =>
        !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

    const onSelect = (data) => {
        console.log('onSelect', data);
    };

    const onChange = (data) => {
        setValue(data);
    };

  return (
    <div className='search-home-page'>
         <AutoComplete
        options={options}
        style={{
          width: 500,
          height: 60
        }}
        onSelect={onSelect}
        onSearch={(text) => setOptions(getPanelValue(text))}
      >
        <Input.Search size="large" placeholder="Tìm kiếm qua địa chỉ, thành phố hoặc ZIP CODE" enterButton />
      </AutoComplete>
    </div>
  )
}
