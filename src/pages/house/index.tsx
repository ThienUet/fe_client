import React, { useState } from 'react';
import { useLoadScript, GoogleMap } from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useMemo } from 'react';
import PlacesAutocomplete from 'components/google-map/auto-complete';
import { Position } from 'type/google-map';
import { Drawer } from 'antd';
import { queryName } from 'utils/query-const';
import { useQuery } from '@tanstack/react-query';
import { useGetHouseList } from 'libs/house-service';
import HouseList from 'components/google-map/house-list';

const House: NextPage = () => {
  const libraries = useMemo(() => ['places'], []);

  const [open, setOpen] = useState(true);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [center, setCenter] = useState<Position>({
    lat: 27.672932021393862,
    lng: 85.31184012689732,
  });

  const { data, isLoading, refetch } = useGetHouseList({
    queryFor: 'map',
    queryType: 'distance',
    distance: 10,
    // lat: 21.027964, lng: 105.8510132
    mapPoint: '105.8510132,21.027964',
  });
  console.log(data);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAT-29Vo1xQZU4nCKMCgvKfRivVJ2KkHhU',
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  const handleChangePlace = ({ lat, lng }) => {
    setCenter({ lat: lat, lng: lng });
  };

  return (
    <div>
      <div>side bar</div>
      <div
        style={{ padding: '8px', borderTop: '1px solid black', borderBottom: '1px solid black' }}
      >
        <PlacesAutocomplete handleChangePlace={handleChangePlace} />
      </div>
      <div style={{ position: 'relative' }}>
        <GoogleMap
          options={{
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: false,
          }}
          zoom={14}
          center={center}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: '100vw', height: '100vh' }}
          onLoad={() => console.log('Map Component Loaded...')}
        />
        <Drawer
          placement='right'
          closable={false}
          onClose={onClose}
          open={open}
          getContainer={false}
          maskClosable={false}
          mask={false}
          width={'40vw'}
        >
          <HouseList houseList={data}></HouseList>
        </Drawer>
      </div>
    </div>
  );
};

export default House;
