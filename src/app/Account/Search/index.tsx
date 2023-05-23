import React, { useEffect, useState } from 'react';
import { House, HouseListParams } from 'type/house';
import { useRouter } from 'next/router';
import Filter from '../../../components/google-map/filter';
import CustomImage from 'components/google-map/custom-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDollar, faLocationDot, faVectorSquare } from '@fortawesome/free-solid-svg-icons';
import { Divider } from 'antd';
import moment from 'moment';
import style from './style.module.scss';
import { useMutation } from '@tanstack/react-query';
import { getList } from 'services/house-services';
import { getGeocode } from 'use-places-autocomplete';
require('moment/locale/vi');

const Search = () => {
  const router = useRouter();
  const { lat, lng, houseCategory } = router.query;
  const [listParams, setListParams] = useState<HouseListParams>({
    queryFor: '',
    queryType: 'distance',
    distance: 10,
    pageNumber: 0,
    mapPoint: `${lng}, ${lat}`,
    pageSize: 10,
    houseCategory: parseInt(houseCategory as string),
  });
  const [currentAddress, setCurrentAddress] = useState<string>('');

  const {
    mutate,
    isLoading: loading,
    data,
  }: {
    mutate: any;
    isLoading: boolean;
    data: {
      houses: House[];
      size: number;
      currentPage: number;
      totalPage: number;
      totalSize: number;
    };
  } = useMutation({
    mutationFn: (params: HouseListParams) => getList(params),
  });

  useEffect(() => {
    if (listParams.houseCategory && listParams.mapPoint) {
      mutate(listParams);
      if (lat && lng) {
        getGeocode({
          location: {
            lat: parseFloat(lat as string),
            lng: parseFloat(lng as string),
          },
        }).then((address) => {
          setCurrentAddress(address[0].formatted_address);
        });
      }
    }
  }, [listParams]);

  const renderResultPrice = () => {
    if (listParams.priceFrom && listParams.priceTo) {
      return (
        <span>
          Với mức giá từ {listParams.priceFrom}đ tới {listParams.priceTo}đ
        </span>
      );
    }
    if (listParams.priceFrom) {
      return <span>Với mức giá từ {listParams.priceFrom}đ</span>;
    }
    if (listParams.priceTo) {
      return <span>Với mức giá tới {listParams.priceTo}đ</span>;
    }
  };
  return (
    <div
      style={{ padding: '8px 200px', backgroundColor: '#e6e6e6', minHeight: 'calc(100vh - 70px)' }}
    >
      <div>
        <div style={{ fontSize: '1.4rem', fontWeight: '600', color: '#19194d' }}>
          Kết quả tìm kiếm
        </div>
        <div style={{ marginBottom: '24px' }}>
          {listParams.houseCategory == 1 ? <span>Mua nhà </span> : <span>Thuê nhà </span>}
          {currentAddress ? <span>quanh khu vực {currentAddress}. </span> : null}
          {listParams.distance ? <span>Bán kính {listParams.distance}km. </span> : null}
          {renderResultPrice()}
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '16px 32px',
            borderRadius: '6px',
            marginBottom: '8px',
            fontWeight: '600',
          }}
        >
          Bộ lọc
          <Filter params={listParams} setParams={setListParams} />
        </div>
        <div>
          {data?.houses?.map((item, index) => {
            const createdDate = moment(new Date(item.createdDate)).fromNow();
            return (
              <div
                key={index}
                className={style.houseItem}
                onClick={() => {
                  router.push({ pathname: '/house-detail', query: { id: item.houseId } });
                }}
              >
                <div>
                  <CustomImage
                    src={item.thumbnail}
                    style={{ height: '200px', width: '200px', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ marginLeft: '32px', flex: '1', position: 'relative' }}>
                  <p style={{ fontSize: '1.4rem', marginBottom: '16px' }}>{item.title}</p>
                  <div className={style.descriptionElipsis}>{item.description}</div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      marginBottom: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <FontAwesomeIcon icon={faCommentDollar} />
                      <span>{item.price} VND</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <FontAwesomeIcon icon={faVectorSquare} />
                      <span>{item.square} (mét vuông)</span>
                    </div>
                    <div
                      style={{
                        width: '180px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                    >
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span className={style.addressElipsis}>{item.address}</span>
                    </div>
                  </div>
                  <Divider />
                  <div style={{ position: 'absolute', bottom: '0', left: '0', color: '#808080' }}>
                    {createdDate}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
