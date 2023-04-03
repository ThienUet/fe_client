import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { ConnectionState } from './connection-state';
import { ConnectionManager } from './connection-manager';
import { MyForm } from './my-form';
import { Events } from './event';
import { Button } from 'antd';

export default function SocketComponent() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  useEffect(() => {
    socket.connect();

    const receiveMessage = () => {
      console.log('receive');
    };

    const historyChat = () => {
      console.log('history chat');
    };

    socket.on('connect', () => {
      console.log('this');
    });
    // socket.on('FE_receive_message', receiveMessage);
    // socket.on('FE_receive_history_chat', historyChat);
    // socket.on('foo', onFooEvent);

    return () => {
      socket.off('FE_receive_message', receiveMessage);
      socket.off('FE_receive_history_chat', historyChat);
      socket.disconnect();
    };
  }, []);

  return (
    <div className='App'>
      day goi
      <ConnectionState isConnected={isConnected} />
      <Events events={fooEvents} />
      <ConnectionManager />
      <MyForm />
      <Button
        onClick={() => {
          socket.timeout(5000).emit(
            'FE_send_messageadsad',
            {
              to: '07fc5693-2322-4066-b80c-d2e67b359627',
              body: 'this',
            },
            (any) => {
              console.log(any);
            },
          );
        }}
      >
        click
      </Button>
    </div>
  );
}
