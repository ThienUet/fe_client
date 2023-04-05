export interface User {
  info: {
    _id: string;
    firstName: string;
    image: string;
    lastName: string;
  };
  lastTimeCommunicate: string;
  message: string;
  unRead: number;
  _id: string;
}

export interface sendMessage {
  to: string;
  body: string;
}

export interface chatLog {
  body: string;
  createAt: string;
  from: {
    firstName: string;
    image: string;
    lastName: string;
    _id: string;
  };
  to: {
    firstName: string;
    image: string;
    lastName: string;
    _id: string;
  };
}

export interface MessageType {
  type: 'text' | 'image' | 'link';
  text?: string;
  link?: string;
  image?: string;
}

export interface ReceiveMessage {
  body: string;
  createAt: string;
  from: {
    firstName: string;
    image: string;
    lastName: string;
    _id: string;
  };
  to: {
    firstName: string;
    image: string;
    lastName: string;
    _id: string;
  };
  totalUnread: number;
  totalUnreadWithUser: number;
}
