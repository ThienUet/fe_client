import React, { useEffect, useState } from 'react';
import { useLoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import type { NextPage } from 'next';
import { useMemo } from 'react';
import { Button, Drawer, Empty, Spin } from 'antd';
import { useGetHouseList } from 'libs/house-service';
import HouseList from 'components/google-map/house-list';
import { House, HouseListParams } from 'type/house';
import CustomFilter from 'components/google-map/filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import HouseDetail from 'components/google-map/house-detail';
import style from './style.module.scss';
import _, { set } from 'lodash';
import { mapStyling } from 'services/map';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { getHouseDetail } from 'services/house-services';
import { User } from 'type/user';
import FireBaseMessagingLayout from 'components/fcm';

interface HouseDetailProps {
  isOpen: boolean;
  data?: House | null;
}

interface Props {
  user: User;
}

const House: NextPage = ({ user }: Props) => {
  const router = useRouter();
  const { lat, lng, houseCategory } = router.query;
  const [listParams, setListParams] = useState<HouseListParams>({
    queryFor: 'map',
    queryType: 'distance',
    distance: 10,
    pageNumber: 0,
    pageSize: 10,
  });

  const onSuccess = (value: any) => {
    setIsOpenHouseDetail({
      isOpen: true,
      data: value,
    });
  };

  const onError = (value: any) => {
    // console.log(value, 'value');
  };

  const houseDetail: { data: any; mutate: any } = useMutation({
    onSuccess: onSuccess,
    onError: onError,
    mutationFn: getHouseDetail,
  });

  const [map, setMap] = useState<google.maps.Map>(null);

  const [isOpenHouseDetail, setIsOpenHouseDetail] = useState<HouseDetailProps>({
    isOpen: false,
    data: null,
  });

  const [openDawer, setOpenDrawer] = useState(true);

  const { data, isLoading } = useGetHouseList({
    ...listParams,
  });

  const handleClickHouseMarker = (id: string) => {
    if (id && typeof id === 'string') {
      houseDetail.mutate({ id: id });
    }
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

  useEffect(() => {
    if (lat && lng) {
      map &&
        lat &&
        lng &&
        map?.panTo({
          lat: parseFloat(lat as string),
          lng: parseFloat(lng as string),
        });
    } else {
      map &&
        map.panTo({
          lat: 21.02851,
          lng: 105.804817,
        });
    }
  }, [map]);

  return (
    <FireBaseMessagingLayout user={user}>
      <div className={style.housePage}>
        <div
          style={{
            height: '60px',
            paddingLeft: '12px',
            display: 'flex',
            alignItems: 'center',
            borderTop: '1px solid #bfbfbf',
            borderBottom: '1px solid #bfbfbf',
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
            mapContainerStyle={{ width: '100vw', height: 'calc(100vh - 70px - 60px)' }}
            onLoad={(map) => {
              setMap(map);
            }}
            onBoundsChanged={() => {
              debounceBoundChange(map);
            }}
          >
            <Marker
              position={{
                lat: parseFloat(lat as string),
                lng: parseFloat(lng as string),
              }}
            />
            {data?.houses?.map((item, index) => {
              return (
                <Marker
                  onClick={() => handleClickHouseMarker(item.houseId)}
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
            {isLoading ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Spin tip='Loading' size='large'></Spin>
              </div>
            ) : (
              <HouseList
                params={listParams}
                setParams={setListParams}
                houseList={data}
                user={user}
              ></HouseList>
            )}
            {!isLoading && !data?.houses?.length ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : null}
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
          user={user}
        />
      </div>
    </FireBaseMessagingLayout>
  );
};

export default House;
