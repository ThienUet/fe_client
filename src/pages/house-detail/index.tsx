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
import FireBaseMessagingLayout from 'components/fcm';

interface Props {
  user: User;
}

const HouseDetail = ({ user }: Props) => {
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
    <FireBaseMessagingLayout user={user}>
      <div
        className={style.houseDetailContainer}
        style={{
          padding: '8px 200px',
          backgroundColor: '#e6e6e6',
          minHeight: 'calc(100vh - 70px)',
        }}
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
              <div style={{ height: '220px', width: '100%' }}>
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
                  <div
                    style={{
                      color: 'rgb(0, 106, 255)',
                      display: 'flex',
                      gap: '16px',
                      fontSize: '1.1rem',
                      fontWeight: '300',
                    }}
                  >
                    <div>
                      <FontAwesomeIcon icon={faHeart} />
                      <span style={{ marginLeft: '4px', cursor: 'pointer' }}>Save</span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faShareFromSquare} />
                      <span style={{ marginLeft: '4px', cursor: 'pointer' }}>Share</span>
                    </div>
                    <div>
                      <FontAwesomeIcon icon={faTriangleExclamation} />
                      <span style={{ marginLeft: '4px', cursor: 'pointer' }}>Report</span>
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
                </div>
                <Divider style={{ height: '0.5px', marginBottom: '4px', marginTop: '16px' }} />
              </div>
              <div
                id='containerdiv'
                style={{
                  // height: 'calc(100vh - 220px - 24px)',
                  scrollBehavior: 'smooth',
                  marginTop: '8px',
                }}
              >
                {/* unit here */}
                <div className='div'>
                  <FirstHeader text='Giá tiền' />
                  <SecondHeader text={`+ ${houseDetail.data?.price} VND`} />
                </div>
                <Space />
                {/* overview here */}
                <div>
                  <FirstHeader text='Liên hệ' />
                  <div
                    style={{ fontSize: '1rem' }}
                    dangerouslySetInnerHTML={{ __html: houseDetail.data.description }}
                  >
                    {/* {houseDetail.data.description ? houseDetail.data.description : 'this is description'} */}
                  </div>
                  <SecondHeader text='Công ty / cá nhân sở hữu' />
                  <LeasingAgent user={houseDetail.data.owner} myInfo={user} />
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
                padding: '8px 24px',
                borderRadius: '6px',
              }}
            >
              <div>
                <Row>
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
    </FireBaseMessagingLayout>
  );
};

export default HouseDetail;
