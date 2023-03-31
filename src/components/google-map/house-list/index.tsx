import React, { Dispatch, SetStateAction, useState } from 'react';
import { House, HouseListParams } from 'type/house';
import CustomImage from '../custom-image';
import HouseDetail from '../house-detail';
import styles from './style.module.scss';

interface Props {
  houseList: {
    houses: House[];
    size: number;
    totalSize: number;
  };
  params: HouseListParams;
  setParams: Dispatch<SetStateAction<HouseListParams>>;
}

interface HouseDetailProps {
  isOpen: boolean;
  data?: House | null;
}

const HouseList = ({ houseList, params, setParams }: Props) => {
  const [isOpenHouseDetail, setIsOpenHouseDetail] = useState<HouseDetailProps>({
    isOpen: false,
    data: null,
  });

  const handleOpenHouseDetail = (item: House) => {
    setIsOpenHouseDetail({
      isOpen: true,
      data: item,
    });
  };

  const handleCloseHouseDetail = () => {
    setIsOpenHouseDetail({
      isOpen: false,
      data: null,
    });
  };

  return (
    <div className={styles.houseListContainer}>
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
                position: 'relative',
              }}
              onClick={() => handleOpenHouseDetail(item)}
            >
              <div className={styles.houseMask}></div>
              <div
                style={{
                  borderRadius: '8px 8px 0 0',
                  overflow: 'hidden',
                  width: '100%',
                  height: '220px',
                }}
              >
                <CustomImage
                  src={item.thumbnail}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                ></CustomImage>
              </div>
              <div style={{ padding: '8px 16px' }}>
                <div style={{ fontWeight: '700', fontSize: '1.2rem' }}>{item.price} VND</div>
                <div style={{ fontSize: '1rem' }}>{item.address}</div>
              </div>
            </div>
          );
        })}
      </div>
      <HouseDetail
        isOpen={isOpenHouseDetail.isOpen}
        handleClose={handleCloseHouseDetail}
        data={isOpenHouseDetail.data}
      />
    </div>
  );
};

export default HouseList;
