export interface House {
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
  owner?: {
    email?: string;
    userId?: string;
    userImage?: string;
    userRating?: number;
    lastName?: string;
    firstName?: string;
    phoneNumber?: string;
  };
}
