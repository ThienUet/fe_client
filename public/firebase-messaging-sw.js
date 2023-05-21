importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js');

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

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging(app);
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  var promise = new Promise(function (resolve) {
    setTimeout(resolve, 1000);
  }).then(function () {
    return clients.openWindow(event.notification.data.locator);
  });

  event.waitUntil(promise);
});
messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = 'Zeehome chat';
  const notificationOptions = {
    body: `bạn có tin nhắn mới từ ${payload.data.fromFirstName} ${payload.data.fromLastName}`,
    data: {
      locator: `https://localhost:3000/chat?id=${payload.data.fromId}`,
    },
  };
  return self.registration.showNotification(notificationTitle, notificationOptions);
});
