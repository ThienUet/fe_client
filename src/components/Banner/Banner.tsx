import React, { useState } from 'react';
import Image from '../Image/CustomImage';
import HeaderSearch from 'components/google-map/header-search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

export default function Banner() {
  const router = useRouter();
  const [searchHouse, setSearchHouse] = useState<{
    pathName: '/search' | '/house';
    query: {
      lat: number;
      lng: number;
      houseCategory: string;
    };
  }>({
    pathName: '/search',
    query: null,
  });

  const handleChangePlace = ({
    lat,
    lng,
    houseType,
  }: {
    lat: number;
    lng: number;
    houseType?: string;
  }) => {
    setSearchHouse({
      ...searchHouse,
      query: { lat: lat, lng: lng, houseCategory: houseType },
    });
  };

  const handleClickSearch = () => {
    if (searchHouse?.pathName && searchHouse?.query?.houseCategory && searchHouse?.query?.lat) {
      router.push({
        pathname: searchHouse.pathName,
        query: {
          lat: searchHouse.query.lat,
          lng: searchHouse.query.lng,
          houseCategory: searchHouse.query.houseCategory,
        },
      });
    }
  };

  return (
    <div className='banner-main'>
      <Image src={'/static/banner/slider3.jpg'} />
      <div className='content'>
        <div className='banner-title'>Khám phá những địa điểm bạn muốn sống</div>
        <div className='search-box'>
          <HeaderSearch
            handleChangePlace={handleChangePlace}
            handleClickSearch={handleClickSearch}
          />
          <div
            style={{
              width: '100px',
              marginLeft: '12px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '0px 8px',
              borderRadius: '6px',
              transition: 'all .3s ease-in-out',
              cursor: 'pointer',
              border: '1px solid #cccccc',
              backgroundColor: searchHouse.pathName === '/house' ? '#1677ff' : 'white',
              color: searchHouse.pathName === '/house' ? 'white' : 'black',
            }}
            onClick={() => {
              if (searchHouse.pathName === '/house') {
                setSearchHouse({ ...searchHouse, pathName: '/search' });
              } else {
                setSearchHouse({ ...searchHouse, pathName: '/house' });
              }
            }}
          >
            <FontAwesomeIcon icon={faMap} />
            Bản đồ
          </div>
        </div>
      </div>
    </div>
  );
}
