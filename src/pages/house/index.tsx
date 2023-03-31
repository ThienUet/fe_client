import React, { useEffect, useState } from 'react';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useMemo } from 'react';
import { Button, Drawer } from 'antd';
import { useGetHouseList } from 'libs/house-service';
import HouseList from 'components/google-map/house-list';
import { House, HouseListParams } from 'type/house';
import CustomFilter from 'components/google-map/filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import HouseDetail from 'components/google-map/house-detail';
import style from './style.module.scss';
import _ from 'lodash';
import { mapStyling } from 'services/map';

interface HouseDetailProps {
  isOpen: boolean;
  data?: House | null;
}

const House: NextPage = () => {
  const libraries = useMemo(() => ['places'], []);
  const [listParams, setListParams] = useState<HouseListParams>({
    queryFor: 'map',
    queryType: 'distance',
    distance: 10,
    mapPoint: '105.8510132,21.027964',
    pageNumber: 0,
    pageSize: 10,
  });

  const [map, setMap] = useState<google.maps.Map>(null);

  const [isOpenHouseDetail, setIsOpenHouseDetail] = useState<HouseDetailProps>({
    isOpen: false,
    data: null,
  });

  const [openDawer, setOpenDrawer] = useState(true);

  const { data, isLoading, refetch } = useGetHouseList({
    ...listParams,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAT-29Vo1xQZU4nCKMCgvKfRivVJ2KkHhU',
    libraries: libraries as any,
  });

  const handleClickHouseMarker = (houseData: House) => {
    setIsOpenHouseDetail({
      isOpen: true,
      data: houseData,
    });
  };

  const handleCloseHouseDetail = () => {
    setIsOpenHouseDetail({
      isOpen: false,
      data: null,
    });
  };

  const toggleDrawer = () => {
    setOpenDrawer(!openDawer);
  };

  const debounceBoundChange = _.debounce((m: google.maps.Map) => {
    if (m) {
      const bound = m.getBounds();
      if (bound) {
        const northWest = {
          lat: bound.getNorthEast().lat(),
          lng: bound.getSouthWest().lng(),
        };
        const northEast = {
          lat: bound.getNorthEast().lat(),
          lng: bound.getNorthEast().lng(),
        };
        const southEast = {
          lat: bound.getSouthWest().lat(),
          lng: bound.getNorthEast().lng(),
        };
        // here search api here
        const southWest = {
          lat: bound.getSouthWest().lat(),
          lng: bound.getSouthWest().lng(),
        };
        setListParams({
          ...listParams,
          queryType: 'polygon',
          polygonPoints: `${northWest.lng},${northWest.lat},${northEast.lng},${northEast.lat},${southEast.lng},${southEast.lat},${southWest.lng},${southWest.lat}`,
        });
      }
    }
  }, 1000);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style.housePage}>
      <div>side bar</div>
      <div
        style={{
          padding: '8px',
          borderTop: '1px solid black',
          borderBottom: '1px solid black',
        }}
      >
        <CustomFilter params={listParams} setParams={setListParams} />
      </div>

      <div style={{ position: 'relative' }}>
        <GoogleMap
          options={{
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: true,
            styles: mapStyling,
          }}
          zoom={14}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: '100vw', height: '100vh' }}
          onLoad={(map) => {
            setMap(map);
            map.panTo({
              lat: parseFloat(listParams.mapPoint.split(',')[1]),
              lng: parseFloat(listParams.mapPoint.split(',')[0]),
            });
          }}
          onBoundsChanged={() => {
            debounceBoundChange(map);
          }}
        >
          <Marker
            position={{
              lat: parseFloat(listParams.mapPoint.split(',')[1]),
              lng: parseFloat(listParams.mapPoint.split(',')[0]),
            }}
          />
          {data?.houses?.map((item, index) => {
            return (
              <Marker
                onClick={() => handleClickHouseMarker(item)}
                key={index}
                position={{
                  lat: item.latitude,
                  lng: item.longitude,
                }}
                icon={'/static/icons/pin.png'}
              />
            );
          })}
        </GoogleMap>
        <Drawer
          placement='right'
          closable={false}
          open={openDawer}
          getContainer={false}
          maskClosable={false}
          mask={false}
          width={'40vw'}
          destroyOnClose={false}
          className='this'
        >
          <Button
            icon={<FontAwesomeIcon icon={faArrowCircleRight} />}
            shape='circle'
            className={openDawer ? style.buttonActive : style.button}
            onClick={toggleDrawer}
          />
          <HouseList params={listParams} setParams={setListParams} houseList={data}></HouseList>
        </Drawer>
        <Button
          icon={<FontAwesomeIcon icon={faArrowCircleLeft} />}
          shape='circle'
          style={{
            position: 'absolute',
            top: '45%',
            transform: 'translateY(-50%)',
            right: '4px',
          }}
          onClick={toggleDrawer}
        />
      </div>
      <HouseDetail
        isOpen={isOpenHouseDetail.isOpen}
        handleClose={handleCloseHouseDetail}
        data={isOpenHouseDetail.data}
      />
    </div>
  );
};

export default House;
