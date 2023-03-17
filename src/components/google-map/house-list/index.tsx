import React from 'react';
import { House } from 'type/house';
import CustomImage from '../custom-image';

interface Props {
  houseList: {
    houses: House[];
    size: number;
    totalSize: number;
  };
}

const HouseList = ({ houseList }: Props) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}
      >
        {houseList?.houses?.map((item: House, index: number) => {
          return (
            <div
              key={index}
              style={{
                width: '280px',
                borderRadius: '6px',
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              }}
            >
              <div style={{ borderRadius: '8px 8px 0 0', overflow: 'hidden' }}>
                <CustomImage
                  src={item.thumbnail}
                  style={{ width: '100%', objectFit: 'contain' }}
                ></CustomImage>
              </div>
              <div>{item.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HouseList;
