// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBldn5WAM6FCaHaKpmrvbf2TdccyR6OBgA',
  authDomain: 'int3509-1.firebaseapp.com',
  databaseURL: 'https://int3509-1-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'int3509-1',
  storageBucket: 'int3509-1.appspot.com',
  messagingSenderId: '859884689750',
  appId: '1:859884689750:web:3d770525bbf829e45a1ef7',
  measurementId: 'G-XB8XMFX7CJ',
};

export const initializeAppFcm = () => {
  const app = initializeApp(firebaseConfig);
  getMessaging(app);
};
// Initialize Firebases
