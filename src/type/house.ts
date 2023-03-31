export interface House {
  houseId?: string;
  latitude: number;
  longitude: number;
  title: string;
  createdDate: any;
  address: string;
  ward?: string;
  district?: string;
  province?: string;
  houseCategory?: number;
  houseType?: number;
  thumbnail?: string;
  images?: string[];
  price?: number;
  video?: string;
  visible?: boolean;
  square?: number;
  description?: string;
  ac?: boolean;
  parking?: boolean;
  elevator?: boolean;
  pet?: boolean;
  rooms?: number;
  bathRooms?: number;
  bedRooms?: number;
  maintenanceFee?: number;
  furnished?: boolean;
  owner?: Owner;
  invisible?: boolean;
}

export interface HouseEditable {
  address?: string;
  thumbnail?: string;
  images?: string[];
  price?: number;
  video?: string;
  visible?: boolean;
  square?: number;
  description?: string;
  ac?: boolean;
  parking?: boolean;
  elevator?: boolean;
  pet?: boolean;
  rooms?: number;
  bathRooms?: number;
  bedRooms?: number;
  maintenanceFee?: number;
  furnished?: boolean;
}

export interface Owner {
  email?: string;
  userId?: string;
  userImage?: string;
  userRating?: number;
  lastName?: string;
  firstName?: string;
  phoneNumber?: string;
}

export interface HouseListParams {
  queryFor: 'map' | 'normal';
  queryType: 'distance' | 'polygon' | 'all';
  distance?: number; // maximum 100 km;
  polygonPoints?: string; //min item 8
  mapPoint?: string; //[lng; lat]
  pageSize?: number; //default 20
  pageNumber?: number; //default 0
  houseType?: number; // 1 - 5
  ownerId?: string;
  houseCategory?: number; // 1 - 2
  hasAc?: boolean;
  hasParking?: boolean;
  hasElevator?: boolean;
  hasFurnished?: boolean;
  allowPet?: boolean;
  province?: string;
  district?: string;
  ward?: string;
  squareLte?: number; // min 0 less than or equal
  squareGte?: number; // min 0 greater than or equal
  roomLte?: number; // room less than or equal
  roomGte?: number; // room greater than or equal
  bedRoomLte?: number;
  bedRoomGte?: number;
  bathRoomLte?: number;
  bathRoomGte?: number;
  fromDate?: number;
  toDate?: number;
  priceFrom?: number;
  priceTo?: number;
  sortBy?: 'created_date' | 'price' | 'distanceToPoint'; // default created_date
  sortOrder?: 'asc' | 'desc';
}

export interface LocationListParams {
  code: string | number;
}

// 1: sell
// 2: lease

// 1: chung cư
// 2: nhà mặt đất
// 3: đất
// 4: văn phòng/ mặt bằng kinh doanh
// 5: phòng trọ
