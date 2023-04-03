import React, { useMemo } from 'react';
import HeaderSearch from 'components/google-map/header-search';
import { LoadScript } from '@react-google-maps/api';

const Search: React.FC = () => {
  const libraries = useMemo(() => ['places'], []);

  const handleChangePlace = (data: any) => {
    console.log(data);
  };

  return <div className='search-home-page'></div>;
};

export default Search;
