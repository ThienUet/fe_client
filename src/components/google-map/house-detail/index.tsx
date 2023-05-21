import React, { DOMAttributes, useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { House } from 'type/house';
import CustomImage from '../custom-image';
import style from './style.module.scss';
import { Link, Element } from 'react-scroll';

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
} from '../asset';
import {
  faBicycle,
  faHeart,
  faPersonWalking,
  faShareFromSquare,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactPlayer from 'react-player';
import { SwiperSlide, Swiper as SwiperContainer } from 'swiper/react';
import 'swiper/css';
import Swiper, { Mousewheel } from 'swiper';
import { useRouter } from 'next/router';
import { User } from 'type/user';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  data: House;
  user: User;
}

const slideData: {
  id: 'unit' | 'building_overview' | 'fact_and_feature' | 'area_of_interest' | 'near_by_school';
  label: string;
  index: number;
}[] = [
  { id: 'unit', label: 'Giá tiền', index: 0 },
  { id: 'building_overview', label: 'Liên hệ', index: 1 },
  { id: 'fact_and_feature', label: 'Tiện ích', index: 2 },
  { id: 'area_of_interest', label: 'Khu vực xung quanh', index: 3 },
  { id: 'near_by_school', label: 'Trường học gần đây', index: 4 },
];

const HouseDetail = ({ isOpen, handleClose, data, user }: Props) => {
  const router = useRouter();
  const [swiper, setSwiper] = useState<Swiper>(null);
  const [selectedAnchor, setSelectedAnchor] = useState<
    'unit' | 'building_overview' | 'fact_and_feature' | 'area_of_interest' | 'near_by_school'
  >('unit');
  const [nearBySchool, setNearBySchool] = useState<google.maps.places.PlaceResult[]>(null);

  return (
    <Modal
      className={style.houseDetailContainer}
      centered
      zIndex={99999999999999}
      open={isOpen}
      onCancel={() => {
        handleClose();
        setSwiper(null);
        setSelectedAnchor('unit');
        setNearBySchool(null);
      }}
      width={'76vw'}
      style={{ height: '100vh', padding: '0px', borderRadius: 0 }}
      footer={null}
      bodyStyle={{ padding: '0px' }}
      destroyOnClose
      closable={false}
      modalRender={(modal) => (
        <div className={style.houseDetail} style={{ width: '100%' }}>
          {modal}
        </div>
      )}
    >
      {data && data.latitude && data.longitude ? (
        <div style={{ backgroundColor: 'white' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div className={style.houseImages}>
              <div>
                <div style={{ marginBottom: '8px' }}>
                  <CustomImage src={data?.thumbnail} style={{ width: '100%' }} />
                </div>
                <Row>
                  {data?.images?.map((item: string, index: number) => {
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
                {data?.video ? (
                  <div style={{ marginBottom: '8px' }}>
                    <ReactPlayer
                      height={'300px'}
                      width={'100%'}
                      controls
                      url={data?.video}
                    ></ReactPlayer>
                  </div>
                ) : null}
              </div>
              <div style={{ height: '100px' }}></div>
            </div>
            <div style={{ flex: '.5', padding: '8px', height: '100vh', overflowX: 'hidden' }}>
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
                    {data.title}
                  </p>
                  <p className={style.addressElipsis}>{data.address}</p>
                  <div
                    style={{
                      marginTop: '16px',
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '16px',
                    }}
                  >
                    <Button
                      style={{ flex: '1' }}
                      onClick={() => {
                        router.push({
                          pathname: 'chat',
                          query: {
                            id: data.owner.userId,
                            type: '1',
                          },
                        });
                      }}
                    >
                      Tôi muốn mua
                    </Button>
                    <Button
                      onClick={() => {
                        router.push({
                          pathname: 'chat',
                          query: {
                            id: data.owner.userId,
                            type: '2',
                          },
                        });
                      }}
                      style={{ flex: '1' }}
                    >
                      Tôi muốn xem
                    </Button>
                  </div>
                </div>
                <Divider style={{ height: '0.5px', marginBottom: '4px', marginTop: '16px' }} />
                <SwiperContainer
                  scrollbar={{
                    hide: true,
                  }}
                  slidesPerView={'auto'}
                  spaceBetween={20}
                  modules={[Mousewheel]}
                  pagination={{
                    clickable: true,
                  }}
                  className='anchor-swiper'
                  onSwiper={(swiper) => {
                    setSwiper(swiper);
                  }}
                  style={{ backgroundColor: 'white' }}
                >
                  {slideData.map((item, index) => {
                    return (
                      <SwiperSlide key={index}>
                        {swiper ? (
                          <React.Fragment>
                            <Link
                              to={item.id}
                              onSetActive={(to: any) => {
                                // console.log('to');
                                swiper.slideTo(index);
                                setSelectedAnchor(to);
                              }}
                              spy={true}
                              smooth={true}
                              containerId='containerElement'
                              duration={300}
                              delay={0}
                              style={{
                                display: 'inline-block',
                                whiteSpace: 'nowrap',
                                paddingBottom: '8px',
                                textDecoration: 'none',
                              }}
                              onClick={() => {
                                setSelectedAnchor(item.id);
                                swiper.slideTo(index);
                              }}
                            >
                              <span
                                style={{
                                  color: item.id === selectedAnchor ? '#006aff' : 'black',
                                }}
                              >
                                {item.label}
                              </span>
                            </Link>
                            <div
                              style={{
                                width: '100%',
                                backgroundColor: item.id === selectedAnchor ? '#006aff' : 'white',
                                height: '4px',
                              }}
                            ></div>
                          </React.Fragment>
                        ) : null}
                      </SwiperSlide>
                    );
                  })}
                </SwiperContainer>
                <Divider style={{ height: '0.5px', marginTop: '0px' }} />
              </div>
              {swiper ? (
                <Element
                  name='elementContainer'
                  id='containerElement'
                  style={{
                    overflowY: 'scroll',
                    height: 'calc(100vh - 220px - 24px)',
                    scrollBehavior: 'smooth',
                    marginTop: '8px',
                  }}
                >
                  {/* unit here */}
                  <Element name={slideData[0].id} className='element'>
                    <FirstHeader text='Giá tiền' />
                    <SecondHeader text={`+ ${data?.price} VND`} />
                  </Element>
                  <Space />
                  {/* overview here */}
                  <Element name={slideData[1].id}>
                    <FirstHeader text='Liên hệ' />
                    <div
                      style={{ fontSize: '1rem' }}
                      dangerouslySetInnerHTML={{ __html: data.description }}
                    >
                      {/* {data.description ? data.description : 'this is description'} */}
                    </div>
                    <SecondHeader text='Công ty / cá nhân sở hữu' />
                    <LeasingAgent myInfo={user} user={data.owner} />
                  </Element>
                  <Space />
                  {/* key feature */}
                  <Element name={slideData[2].id}>
                    <FirstHeader text='Tiện ích' />
                    <SecondHeader text='Nổi bật' />
                    <KeyFeature
                      ac={data.ac}
                      parking={data.parking}
                      elevator={data.elevator}
                      pet={data.pet}
                      furnished={data.furnished}
                    />
                    <SecondHeader text='Không gian' style={{ marginTop: '16px' }} />
                    <Furnish
                      rooms={data.rooms}
                      bedRooms={data.bedRooms}
                      bathRooms={data.bathRooms}
                      maintenanceFee={data.maintenanceFee}
                    />
                  </Element>
                  <Space />
                  {/* neighborhood */}
                  <Element name={slideData[3].id}>
                    <FirstHeader text='Khu vực xung quanh' />
                    <RegularText text='Hãy sử dụng bản đồ để khám phá xung quanh bất động sản' />
                    <MapArea
                      lat={data.latitude}
                      lng={data.longitude}
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
                  </Element>
                  {/* near by school */}
                  <Space />
                  <Element name={slideData[4].id}>
                    <FirstHeader text='Các trường học xung quanh' />
                    <NearyBySchool data={nearBySchool} />
                  </Element>
                </Element>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
};

export default HouseDetail;
