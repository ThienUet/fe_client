import React, { useEffect, useCallback, useState } from 'react';
import _ from 'lodash';
import Geocode from 'react-geocode';
import { GoogleMap as MapPos, Marker } from '@react-google-maps/api';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiamondTurnRight } from '@fortawesome/free-solid-svg-icons';
import style from './style.module.scss';
import { getGeocode, mapStyling } from 'services/map';

interface MapPosition {
  lat: number;
  lng: number;
}

interface Props {
  value: MapPosition;
  onChange?: ({ lat, lng, address }: { lat: number; lng: number; address: string }) => void;
}

interface InforPopup {
  address?: string;
  mapPosition?: MapPosition;
}

const MapPosition = ({ value, onChange }: Props) => {
  const [pst, setPst] = useState<MapPosition>(null);
  const [center, setCenter] = useState<MapPosition>({
    lat: 10.99835602,
    lng: 77.01502627,
  });
  const [infoPopup, setInfoPopup] = useState<InforPopup>({});
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [map, setMap] = useState<google.maps.Map>(null);

  const debounceLoadData = useCallback(
    _.debounce((p, m: google.maps.Map) => {
      if (p?.lat && p?.lng) {
        setPst(p);
        setCenter(p);
        if (m) {
          m.panTo({
            lat: p?.lat,
            lng: p?.lng,
          });
        }
      } else {
        setPst(null);
      }
    }, 1000),
    [],
  );

  useEffect(() => {
    debounceLoadData(value, map);
  }, [value]);

  return (
    <div
      className={style.selectPositionContainer}
      style={{ height: '600px', width: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <MapPos
        options={{
          disableDefaultUI: true,
          clickableIcons: true,
          scrollwheel: true,
          styles: mapStyling,
        }}
        zoom={14}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        onLoad={(map) => {
          setMap(map);
          map.panTo({
            lat: center.lat,
            lng: center.lng,
          });
        }}
        onClick={async (event: google.maps.MapMouseEvent) => {
          if (isOpenPopup) {
            setIsOpenPopup(false);
          } else {
            try {
              const address = await getGeocode(
                event.latLng.lat().toString(),
                event.latLng.lng().toString(),
              );

              setInfoPopup({
                address: address,
                mapPosition: {
                  lat: event.latLng.lat(),
                  lng: event.latLng.lng(),
                },
              });
              setIsOpenPopup(true);
            } catch (err) {
              console.error(err);
            }
          }
        }}
      >
        {pst?.lat && pst?.lng ? <Marker position={{ lat: pst?.lat, lng: pst?.lng }} /> : null}
        {infoPopup.mapPosition?.lat && infoPopup.mapPosition.lng && isOpenPopup ? (
          <Marker
            position={{
              lat: infoPopup.mapPosition?.lat,
              lng: infoPopup.mapPosition?.lng,
            }}
            icon={'/static/icons/pin2.png'}
          ></Marker>
        ) : null}
      </MapPos>
      <div className={`${style.mapInfoSlide} ${isOpenPopup ? style.slideActive : ''} `}>
        <div>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '6px',
              padding: '8px',
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            }}
          >
            <div style={{ display: 'flex', gap: '4px' }}>
              <div style={{ width: '100px' }}>
                <img
                  style={{ width: '100%', objectFit: 'contain' }}
                  src='https://img.freepik.com/free-vector/city-skyline-concept-illustration_114360-8923.jpg'
                ></img>
              </div>
              <div>
                <div style={{ width: '200px' }}>
                  <span className={style.addressElipsis}>{infoPopup.address}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '.6rem' }}>{infoPopup.mapPosition?.lat}</span>
                  <span style={{ fontSize: '.6rem' }}>{infoPopup.mapPosition?.lng}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                <Button
                  onClick={() => {
                    onChange({ ...infoPopup.mapPosition, address: infoPopup.address });
                    setIsOpenPopup(false);
                  }}
                  icon={<FontAwesomeIcon icon={faDiamondTurnRight} />}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPosition;
