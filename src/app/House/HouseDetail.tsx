import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import CustomImage from 'components/google-map/custom-image';
import style from './style.module.scss';
import {
  Divider,
  FirstHeader,
  Furnish,
  KeyFeature,
  LeasingAgent,
  MapArea,
  NearyBySchool,
  RegularText,
  SecondHeader,
  Space,
  TravelModeScore,
} from './../../components/google-map/asset/index';
import {
  faBicycle,
  faHeart,
  faPersonWalking,
  faShareFromSquare,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPlayer from 'react-player';
import { useMutation } from '@tanstack/react-query';
import { getHouseDetail } from 'services/house-services';
import { User } from 'type/user';
interface Props {
  myInfo: User;
}

const HouseDetail = ({ myInfo }: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [nearBySchool, setNearBySchool] = useState<google.maps.places.PlaceResult[]>(null);
  const houseDetail: { data: any; mutate: any } = useMutation(getHouseDetail);

  useEffect(() => {
    if (id && typeof id === 'string') {
      houseDetail.mutate({ id: id });
    }
  }, [id]);

  return (
    <div
      className={style.houseDetailContainer}
      style={{ padding: '8px 200px', backgroundColor: '#e6e6e6', minHeight: 'calc(100vh - 70px)' }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '16px 32px',
          borderRadius: '6px',
          marginBottom: '8px',
          fontSize: '1.6rem',
          fontWeight: '600',
        }}
      >
        Chi tiết bài đăng
      </div>
      {houseDetail?.data && houseDetail?.data?.latitude && houseDetail?.data?.longitude ? (
        <div>
          <div
            style={{
              backgroundColor: 'white',
              overflowX: 'hidden',
              padding: '8px 24px',
              borderRadius: '6px',
              marginBottom: '32px',
            }}
          >
            <div style={{ height: '160px', width: '100%' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <div className={style.intro}>
                  <div className={style.appIcon}>
                    <img src='/static/logo/logo.png'></img>
                  </div>
                  <div>
                    <span
                      style={{
                        color: 'black',
                        fontWeight: '900',
                        fontSize: '1.3rem',
                        letterSpacing: '2px',
                      }}
                    >
                      Zee
                    </span>
                    <span
                      style={{
                        color: 'black',
                        fontSize: '1.3rem',
                      }}
                    >
                      Home
                    </span>
                  </div>
                </div>
              </div>
              <Divider style={{ height: '0.5px', marginBottom: '8px' }} />
              <div>
                <p
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    margin: '0',
                    lineHeight: '1.8rem',
                  }}
                >
                  {houseDetail.data.title}
                </p>
                <p className={style.addressElipsis}>{houseDetail.data.address}</p>
                {myInfo?.userId == houseDetail.data.owner.userId ? null : (
                  <div
                    style={{
                      marginTop: '16px',
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '16px',
                    }}
                  >
                    <Button style={{ flex: '1' }}>Tôi muốn thuê</Button>
                    <Button style={{ flex: '1' }}>Tôi muốn xem</Button>
                  </div>
                )}
              </div>
              <Divider style={{ height: '0.5px', marginBottom: '4px', marginTop: '16px' }} />
            </div>
            <div
              id='containerdiv'
              style={{
                scrollBehavior: 'smooth',
                marginTop: '30px',
              }}
            >
              {/* unit here */}
              <div>
                <FirstHeader text='Giá tiền' />
                <SecondHeader text={`+ ${houseDetail.data?.price} VND`} />
              </div>
              <Space />
              {/* overview here */}
              <div>
                <div style={{ fontSize: '1rem' }} dangerouslySetInnerHTML={{ __html: 'Mô tả: ' }} />
                <div
                  style={{ fontSize: '1rem' }}
                  dangerouslySetInnerHTML={{ __html: houseDetail.data.description }}
                >
                  {/* {houseDetail.data.description ? houseDetail.data.description : 'this is description'} */}
                </div>
                <FirstHeader text='Liên hệ' />
                <SecondHeader text='Công ty / cá nhân sở hữu' />
                <LeasingAgent myInfo={myInfo} user={houseDetail.data.owner} />
              </div>
              <Space />
              {/* key feature */}
              <div>
                <FirstHeader text='Tiện ích' />
                <SecondHeader text='Nổi bật' />
                <KeyFeature
                  ac={houseDetail.data.ac}
                  parking={houseDetail.data.parking}
                  elevator={houseDetail.data.elevator}
                  pet={houseDetail.data.pet}
                  furnished={houseDetail.data.furnished}
                />
                <SecondHeader text='Không gian' style={{ marginTop: '16px' }} />
                <Furnish
                  rooms={houseDetail.data.rooms}
                  bedRooms={houseDetail.data.bedRooms}
                  bathRooms={houseDetail.data.bathRooms}
                  maintenanceFee={houseDetail.data.maintenanceFee}
                />
              </div>
              <Space />
              {/* neighborhood */}
              <div>
                <FirstHeader text='Khu vực xung quanh' />
                <RegularText text='Hãy sử dụng bản đồ để khám phá xung quanh bất động sản' />
                <MapArea
                  lat={houseDetail.data.latitude}
                  lng={houseDetail.data.longitude}
                  setNearBySchool={setNearBySchool}
                />
                <Space />
                <TravelModeScore
                  icon={
                    <FontAwesomeIcon
                      icon={faPersonWalking}
                      style={{ fontSize: '1.5rem', color: 'white' }}
                    />
                  }
                  mode='Đi bộ'
                  description=''
                  score={70}
                />
                <TravelModeScore
                  icon={
                    <FontAwesomeIcon
                      icon={faBicycle}
                      style={{ fontSize: '1.5rem', color: 'white' }}
                    />
                  }
                  mode='Xe đạp'
                  description='Có thể đi được'
                  score={70}
                />
              </div>
              {/* near by school */}
              <Space />
              <div>
                <FirstHeader text='Các trường học xung quanh' />
                <NearyBySchool data={nearBySchool} />
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              padding: '16px 24px',
              borderRadius: '6px',
            }}
          >
            <div>
              <div>
                <CustomImage src={houseDetail.data?.thumbnail} style={{ width: '100%' }} />
              </div>
              <Row style={{ marginTop: '8px' }}>
                {houseDetail.data?.images?.map((item: string, index: number) => {
                  console.log(houseDetail.data.images);
                  return (
                    <Col
                      key={index}
                      span={12}
                      style={{
                        paddingLeft: index % 2 === 1 ? '2px' : '0px',
                        paddingRight: index % 2 === 0 ? '2px' : '0px',
                        paddingBottom: '5px',
                      }}
                    >
                      <CustomImage key={index} src={item} style={{ width: '100%' }} />
                    </Col>
                  );
                })}
              </Row>
              {houseDetail.data?.video ? (
                <div style={{ marginBottom: '8px' }}>
                  <ReactPlayer
                    height={'300px'}
                    width={'100%'}
                    controls
                    url={houseDetail.data?.video}
                  ></ReactPlayer>
                </div>
              ) : null}
            </div>
            <div style={{ height: '100px' }}></div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HouseDetail;
