import React from 'react';
import dynamic from 'next/dynamic';
const SearchComponent = dynamic(() => import('../../app/Account/Search/index'), { ssr: false });
const Search = () => {
  return <SearchComponent />;
};

export default Search;
