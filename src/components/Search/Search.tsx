import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';

const mockVal = (str: string, repeat = 1) => ({
  value: str.repeat(repeat),
});

const Search: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [value, setValue] = React.useState();
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const getPanelValue = (searchText: string) =>
    !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)];

  const onSelect = (data: any) => {
    console.log('onSelect', data);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChange = (data: any) => {
    setValue(data);
  };

  return (
    <div className='search-home-page'>
      <AutoComplete
        options={options}
        style={{
          width: 500,
        }}
        onSelect={onSelect}
        onSearch={(text: string) => setOptions(getPanelValue(text))}
      >
        <Input.Search
          size='large'
          placeholder='Tìm kiếm qua địa chỉ, thành phố hoặc ZIP CODE'
          enterButton
        />
      </AutoComplete>
    </div>
  );
};

export default Search;
