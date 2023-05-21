import { CheckOutlined, UserOutlined } from '@ant-design/icons';
import {
  faCarSide,
  faCouch,
  faDog,
  faElevator,
  faSquareParking,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleMap, DirectionsRenderer, Marker } from '@react-google-maps/api';
import { Avatar, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { mapStyling } from 'services/map';
import { Owner } from 'type/house';
import PlacesAutocomplete from '../auto-complete';
import style from './style.module.scss';
import { useRouter } from 'next/router';
import { useGetFollwingCheck } from 'libs/user-service';
import { useMutation } from '@tanstack/react-query';
import { deleteFollowing, setFollowing } from 'services/user-services';
import { User } from 'type/user';
interface DividerProps {
  style?: React.CSSProperties;
}

const Divider = ({ style }: DividerProps) => {
  return (
    <div
      style={{
        backgroundColor: '#cccccc',
        width: '100%',
        marginTop: '8px',
        height: '1px',
        ...style,
      }}
    ></div>
  );
};

interface HeaderProps {
  style?: React.CSSProperties;
  text: string;
}

const FirstHeader = ({ style, text }: HeaderProps) => {
  return <p style={{ fontSize: '1.6rem', fontWeight: '600', margin: '0px', ...style }}>{text}</p>;
};

const SecondHeader = ({ style, text }: HeaderProps) => {
  return <p style={{ fontSize: '1.2rem', fontWeight: '500', margin: '0px', ...style }}>{text}</p>;
};

const RegularText = ({ style, text }: HeaderProps) => {
  return <p style={{ fontSize: '1rem', margin: '0px', ...style }}>{text}</p>;
};

interface SpaceProps {
  style?: React.CSSProperties;
}

const Space = ({ style }: SpaceProps) => {
  return <div style={{ width: '100%', height: '32px', ...style }}></div>;
};

interface MapAreaProps {
  lat: number;
  lng: number;
  setNearBySchool: React.Dispatch<any>;
}

type Nearby = {
  label: string;
  value: string;
  isActive: boolean;
  data: google.maps.places.PlaceResult[];
  tag?: any;
};

const MapArea = ({ lat, lng, setNearBySchool }: MapAreaProps) => {
  const [targetPosition, setTargetPosition] = useState<{
    lat: number;
    lng: number;
    address: string;
    travelMode: google.maps.TravelMode;
  }>({
    lat: null,
    lng: null,
    address: null,
    travelMode: google.maps.TravelMode.DRIVING,
  });

  const [map, setMap] = useState<google.maps.Map>(null);
  const [directionResponse, setDirectionResponse] = useState<google.maps.DirectionsResult>(null);
  const [directionDetail, setDirectionDetail] = useState<{
    distance: string;
    duration: string;
    travelMode: google.maps.TravelMode;
    address: string;
  }>({
    distance: null,
    duration: null,
    travelMode: null,
    address: null,
  });

  const calculateRoute = async () => {
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: { lat: lat, lng: lng },
      destination: { lat: targetPosition.lat, lng: targetPosition.lng },
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionResponse(results);
    setDirectionDetail({
      distance: results.routes[0].legs[0].distance.text,
      duration: results.routes[0].legs[0].duration.text,
      travelMode: google.maps.TravelMode.DRIVING,
      address: targetPosition.address,
    });
  };
  // const [nearBySchools, setNearBySchools] = useState<google.maps.places.PlaceResult[]>([]);

  useEffect(() => {
    if (targetPosition.lat && targetPosition.lng && lat && lng) {
      calculateRoute();
    }
  }, [targetPosition]);

  const clearRoute = () => {
    setDirectionResponse(null);
  };

  const handleChangePlace = ({ lat, lng, address }) => {
    setTargetPosition({ lat, lng, address, travelMode: google.maps.TravelMode.DRIVING });
  };

  const [nearby, setNearby] = useState<Nearby[]>([
    {
      label: 'Restaurants',
      value: 'restaurants',
      tag: 'restaurant',
      isActive: false,
      data: [],
    },
    {
      label: 'Shopping',
      value: 'shoppings',
      tag: 'shopping',
      isActive: false,
      data: [],
    },
    {
      label: 'Beauty and spas',
      value: 'beautyandspas',
      tag: 'spa',
      isActive: false,
      data: [],
    },
    {
      label: 'Gym',
      value: 'gym',
      tag: 'gym',
      isActive: false,
      data: [],
    },
  ]);

  const handleSelect = (index: number) => {
    const newArray = nearby;
    newArray[index] = {
      ...newArray[index],
      isActive: !newArray[index].isActive,
    };

    const item = newArray[index];

    setNearby([...newArray]);

    if (map && item.isActive && item.tag) {
      const nearByPointsService = new google.maps.places.PlacesService(map);
      nearByPointsService.nearbySearch(
        {
          location: {
            lat: lat,
            lng: lng,
          },
          radius: 500,
          type: item.tag,
        },
        (results: google.maps.places.PlaceResult[], status) => {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            newArray[index] = {
              ...newArray[index],
              data: results,
            };
            setNearby([...newArray]);
          }
        },
      );
    } else if (!item.isActive) {
      newArray[index] = {
        ...newArray[index],
        data: [],
      };
      setNearby([...newArray]);
    }
  };

  const onMapLoad = (m: google.maps.Map) => {
    setMap(m);
    const service = new google.maps.places.PlacesService(m);
    service.nearbySearch(
      {
        location: {
          lat: lat,
          lng: lng,
        },
        radius: 500,
        type: 'university',
      },
      (results: google.maps.places.PlaceResult[], status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          setNearBySchool(results);
        }
      },
    );
  };

  return (
    <div style={{ marginTop: '16px' }} className={style.googleMap}>
      <GoogleMap
        options={{
          disableDefaultUI: true,
          clickableIcons: true,
          scrollwheel: true,
          styles: mapStyling,
        }}
        zoom={14}
        center={{
          lat: lat,
          lng: lng,
        }}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: '100%', height: '240px', borderRadius: '6px' }}
        onLoad={onMapLoad}
      >
        <Marker position={{ lat: lat, lng: lng }} />
        {directionResponse && <DirectionsRenderer directions={directionResponse} />}
        {nearby[0].data.map((item: google.maps.places.PlaceResult, index: number) => {
          if (index < 2) {
            return (
              <Marker
                icon={'/static/icons/restaurant.png'}
                key={index}
                position={{ lat: item.geometry.location.lat(), lng: item.geometry.location.lng() }}
              ></Marker>
            );
          }
        })}
        {nearby[1].data.map((item: google.maps.places.PlaceResult, index: number) => {
          if (index < 2) {
            return (
              <Marker
                icon={'/static/icons/shopping.png'}
                key={index}
                position={{ lat: item.geometry.location.lat(), lng: item.geometry.location.lng() }}
              ></Marker>
            );
          }
        })}
        {nearby[2].data.map((item: google.maps.places.PlaceResult, index: number) => {
          if (index < 2) {
            return (
              <Marker
                icon={'/static/icons/facial-treatment.png'}
                key={index}
                position={{ lat: item.geometry.location.lat(), lng: item.geometry.location.lng() }}
              ></Marker>
            );
          }
        })}
        {nearby[3].data.map((item: google.maps.places.PlaceResult, index: number) => {
          if (index < 2) {
            return (
              <Marker
                icon={'/static/icons/dumbbell.png'}
                key={index}
                position={{ lat: item.geometry.location.lat(), lng: item.geometry.location.lng() }}
              ></Marker>
            );
          }
        })}
      </GoogleMap>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px', overflowX: 'scroll' }}>
        {nearby.map((item: Nearby, index) => {
          return (
            <span
              className={item.isActive ? style.customButtonActive : style.customButton}
              style={{
                padding: '8px 16px',
                border: item.isActive ? '1px solid blue' : '1px solid black',
                color: item.isActive ? 'blue' : 'black',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                borderRadius: '20px',
                fontWeight: '600',
                transition: 'all .3s ease-in-out',
              }}
              key={index}
              onClick={() => handleSelect(index)}
            >
              {item.label}
            </span>
          );
        })}
      </div>
      <div>
        <SecondHeader text='Đường đi tới' style={{ margin: '16px 0px 8px 0px' }} />
        {directionDetail.distance && directionDetail.duration ? (
          <div
            style={{
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
              borderRadius: '6px',
              margin: '16px 6px',
            }}
          >
            <div
              style={{
                backgroundColor: '#006aff',
                height: '4px',
                width: '100%',
                borderRadius: '6px 6px 0px 0px',
              }}
            ></div>
            <div style={{ padding: '8px 16px' }}>
              <p
                style={{
                  margin: '0px',
                  color: '#1f1f60',
                  fontSize: '1rem',
                  lineHeight: '1.1rem',
                  fontWeight: '500',
                }}
              >
                Tới {directionDetail.address}
              </p>
              <div
                style={{
                  display: 'flex',
                  marginTop: '8px',
                  gap: '8px',
                  // justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    margin: '0px',
                    color: 'white',
                    fontSize: '.9rem',
                    fontWeight: '500',
                    height: '40px',
                    width: '40px',
                    backgroundColor: '#339933',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                  }}
                >
                  <FontAwesomeIcon icon={faCarSide} />
                </div>
                <p
                  style={{ margin: '0px', color: '#339933', fontSize: '.9rem', fontWeight: '500' }}
                >
                  {directionDetail.distance} {directionDetail.duration}
                </p>
              </div>
            </div>
          </div>
        ) : null}
        <div
          style={{
            marginTop: '8px',
            border: '1px solid #cccccc',
            borderRadius: '24px',
            padding: '0px 8px',
          }}
        >
          <PlacesAutocomplete handleChangePlace={handleChangePlace} />
        </div>
      </div>
    </div>
  );
};

const TravelModeScore = ({
  mode,
  description,
  score,
  icon,
}: {
  mode: string;
  description: string;
  score: number;
  icon: any;
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          backgroundColor: 'rgb(0, 106, 255)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
        }}
      >
        {icon}
      </div>
      <div>
        <div>
          <span style={{ fontSize: '1rem', fontWeight: '600', lineHeight: '1.3rem' }}>{mode}</span>
          <div
            style={{ borderTop: '.5px dashed rgb(0, 106, 255)', width: '100%', height: '.2px' }}
          ></div>
        </div>
        <div style={{ fontSize: '1rem' }}>
          <span style={{ color: 'rgb(13, 69, 153)', fontWeight: '600' }}>{score}</span>
          <span> / 100</span>
          <span>{` (${description})`}</span>
        </div>
      </div>
    </div>
  );
};

const LeasingAgent = ({ user, myInfo }: { user: Owner; myInfo: User }) => {
  const router = useRouter();
  const useGetFollowingCheck = useGetFollwingCheck(user.userId);

  const onSuccess = () => {
    useGetFollowingCheck.refetch();
  };

  const { mutate, isLoading: setFollowingLoading } = useMutation({
    onSuccess: onSuccess,
    mutationFn: setFollowing,
  });

  const useDeleteFollowing = useMutation({
    onError: (error) => {
      // console.log('ere');
    },
    onSuccess: () => {
      // console.log('oke');
      useGetFollowingCheck.refetch();
    },
    mutationFn: deleteFollowing,
  });

  return (
    <div>
      <div
        style={{
          display: 'flex',
          marginTop: '16px',
          gap: '16px',
          alignItems: 'center',
        }}
      >
        <div>
          <Avatar size={64} src={user?.userImage} icon={<UserOutlined />} />
        </div>
        <div>
          <p style={{ margin: '0', fontWeight: '600' }}>
            {user?.firstName} {user?.lastName}
          </p>
          <p style={{ margin: '0' }}>{user?.email}</p>
          <div style={{ color: 'rgb(5, 94, 22)' }}>
            <CheckOutlined style={{ fontSize: '.8rem' }} />
            <span style={{ marginBottom: '4px', marginLeft: '6px' }}>Uy tín</span>
          </div>
          <div
            style={{ borderTop: '.5px dashed rgb(5, 94, 22)', width: '100%', height: '.2px' }}
          ></div>
          <p style={{ margin: '0' }}>{user?.phoneNumber}</p>
        </div>
      </div>
      <div>
        <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button
            onClick={() => {
              router.push({
                pathname: 'chat',
                query: {
                  id: user.userId,
                },
              });
            }}
          >
            Gửi tin nhắn
          </Button>
          {useGetFollowingCheck.data && useGetFollowingCheck.data.isFollowing ? (
            <Button
              loading={setFollowingLoading || useGetFollowingCheck.refetch}
              onClick={() => {
                useDeleteFollowing.mutate({ userId: user.userId });
              }}
            >
              Bỏ theo dõi
            </Button>
          ) : (
            <Button
              loading={useDeleteFollowing.isLoading || useGetFollowingCheck.isLoading}
              onClick={() => {
                if (!myInfo || !myInfo.userId) {
                  router.push({
                    pathname: 'account/join_zee_home',
                  });
                } else {
                  mutate({ userId: user.userId });
                }
              }}
            >
              Theo dõi
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const KeyFeature = ({
  ac,
  parking,
  elevator,
  pet,
  furnished,
}: {
  ac?: boolean;
  parking?: boolean;
  elevator?: boolean;
  pet?: boolean;
  furnished?: boolean;
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '1rem' }}>
        <FontAwesomeIcon icon={faWind} style={{ fontSize: '1.2rem', color: 'rgb(0, 106, 255)' }} />
        <div>Điều hòa</div>
      </div>

      {parking ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '1rem' }}>
          <FontAwesomeIcon
            icon={faSquareParking}
            style={{ fontSize: '1.2rem', color: 'rgb(0, 106, 255)' }}
          />
          <div>Bãi gửi xe</div>
        </div>
      ) : null}
      {elevator ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '1rem' }}>
          <FontAwesomeIcon
            icon={faElevator}
            style={{ fontSize: '1.2rem', color: 'rgb(0, 106, 255)' }}
          />
          <div>Thang máy</div>
        </div>
      ) : null}
      {pet ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '1rem' }}>
          <FontAwesomeIcon icon={faDog} style={{ fontSize: '1.2rem', color: 'rgb(0, 106, 255)' }} />
          <div>Thú nuôi</div>
        </div>
      ) : null}
      {furnished ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '1rem' }}>
          <FontAwesomeIcon
            icon={faCouch}
            style={{ fontSize: '1.2rem', color: 'rgb(0, 106, 255)' }}
          />
          <div>Thiết bị</div>
        </div>
      ) : null}
    </div>
  );
};

const Furnish = ({
  rooms,
  bathRooms,
  bedRooms,
  maintenanceFee,
}: {
  rooms?: number;
  bathRooms: number;
  bedRooms: number;
  maintenanceFee: number;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        color: 'white',
        fontWeight: '600',
      }}
    >
      <div style={{ padding: '8px 0' }}>
        <span style={{ padding: '8px 16px', backgroundColor: '#296BCE', borderRadius: '18px' }}>
          Phòng: {rooms ? rooms : 0}
        </span>
      </div>
      <div style={{ padding: '8px 0' }}>
        <span style={{ padding: '8px 16px', backgroundColor: '#297C1B', borderRadius: '18px' }}>
          Phòng tắm: {bathRooms ? bathRooms : 0}
        </span>
      </div>
      <div style={{ padding: '8px 0' }}>
        <span style={{ padding: '8px 16px', backgroundColor: '#828282', borderRadius: '18px' }}>
          Phòng ngủ: {bedRooms ? bedRooms : 0}
        </span>
      </div>
      <div style={{ padding: '8px 0' }}>
        <span style={{ padding: '8px 16px', backgroundColor: '#5409CD', borderRadius: '18px' }}>
          Phụ thu: {maintenanceFee ? maintenanceFee : 0} VND
        </span>
      </div>
    </div>
  );
};

const NearyBySchool = ({ data }: { data: google.maps.places.PlaceResult[] }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
      {data?.map((item, index) => {
        return (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div>
              <div
                style={{
                  fontSize: '1rem',
                  height: '40px',
                  width: '40px',
                  backgroundColor: 'blue',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <p style={{ color: 'white', fontSize: '.8rem', margin: '0px', fontWeight: '700' }}>
                  {item.rating ? item.rating : 'x'}/5
                </p>
              </div>
            </div>
            <div>
              <p style={{ fontSize: '1rem', fontWeight: '600', margin: '0', lineHeight: '1rem' }}>
                {item.name}
              </p>
              <p style={{ margin: '0px' }}>{item.vicinity}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export {
  Divider,
  FirstHeader,
  SecondHeader,
  Space,
  RegularText,
  MapArea,
  TravelModeScore,
  LeasingAgent,
  KeyFeature,
  Furnish,
  NearyBySchool,
};
