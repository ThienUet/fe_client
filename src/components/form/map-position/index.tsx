/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import PlacesAutocomplete from 'components/google-map/auto-complete';
import { Input } from 'antd';
import MapPos from 'components/google-map/select-position';
import { getGeocode } from 'services/map';

interface Props {
  value?: {
    lat: number;
    lng: number;
    address: number;
  };
  onChange?: any;
}

interface MapPosition {
  lat?: number;
  lng?: number;
  address?: string;
}

const CustomFormSelectLocation = ({ value, onChange }: Props) => {
  const handlePositionOnChange = async (e: any) => {
    const { name, value } = e.target;
    const newPos = {
      ...value,
      [name]: value,
    };
    try {
      if (newPos.lat && newPos.lng) {
        const address = await getGeocode(newPos.lat.toString(), newPos.lng.toString());
        onChange({
          ...newPos,
          address: address,
        });
      }
    } catch (err) {
      // console.log(err);
    }
  };

  const handleChangePosition = (pos: MapPosition) => {
    onChange(pos);
  };

  const handleChangePlace = (pos: MapPosition) => {
    onChange(pos);
  };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            zIndex: '999999',
            top: '8px',
            left: '8px',
            width: '340px',
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '6px',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
            }}
          >
            <PlacesAutocomplete handleChangePlace={handleChangePlace} mode='insideMap' />
          </div>
          <div
            style={{
              backgroundColor: 'white',
              padding: '8px 32px',
              borderRadius: '6px',
              marginTop: '16px',
              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
            }}
          >
            <div style={{ display: 'flex', marginTop: '0px', gap: '24px' }}>
              <div>
                <span style={{ fontSize: '.8rem' }}>lat</span>
                <Input
                  value={value?.lat ? value?.lat : ''}
                  onChange={handlePositionOnChange}
                  style={{ fontSize: '.8rem' }}
                  type='number'
                  name='lat'
                ></Input>
              </div>
              <div>
                <span style={{ fontSize: '.8rem' }}>lng</span>
                <Input
                  value={value?.lng ? value?.lng : ''}
                  onChange={handlePositionOnChange}
                  style={{ fontSize: '.8rem' }}
                  type='number'
                  name='long'
                ></Input>
              </div>
            </div>
          </div>
        </div>
        <MapPos value={value} onChange={handleChangePosition}></MapPos>
      </div>
    </div>
  );
};

export default CustomFormSelectLocation;
