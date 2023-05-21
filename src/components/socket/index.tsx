import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { MessageType, chatLog, User, ReceiveMessage } from 'type/chat';
import UserList from './user-list';
import ChatBox from './chat-box';
import { User as UserNow } from 'type/user';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';
import { getUserDetail } from 'services/user-services';
import _ from 'lodash';

interface Props {
  user: UserNow;
}

export default function SocketComponent({ user }: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [userList, setUserList] = useState<User[]>([]);
  const [currentUserChat, setCurrentUserChat] = useState<{
    _id: string;
    firstName: string;
    image: string;
    lastName: string;
  }>(null);

  const [chatLogs, setChatLogs] = useState<chatLog[]>([]);
  const [readAll, setReadAll] = useState<{
    user: {
      _id: string;
      firstName: string;
      image: string;
      lastName: string;
    };
    count: number;
  }>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [newMessage, setNewMessage] = useState<{
    chat: ReceiveMessage;
    totalUnread: number;
    totalUnreadWithUser: number;
  }>(null);

  const onSuccess = (user: UserNow) => {
    if (user) {
      setCurrentUserChat({
        _id: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
      });
      socket.emit(
        'FE_get_chat_history',
        {
          withId: currentUserChat?._id,
        },
        (value: any) => {
          // console.log(value);
        },
      );
    }
  };

  const onError: any = (error: any) => {
    console.log(error);
  };

  const { mutate, isLoading: loading } = useMutation({
    onError: onError,
    onSuccess: onSuccess,
    mutationFn: getUserDetail,
  });

  useEffect(() => {
    if (id) {
      mutate({ userId: id as string });
    }
  }, [id]);

  useEffect(() => {
    if (currentUserChat && currentUserChat?._id) {
      socket.emit(
        'FE_get_chat_history',
        {
          withId: currentUserChat?._id,
        },
        (value: any) => {
          // console.log(value);
        },
      );
      socket.emit('FE_reset_unread', {
        withId: currentUserChat._id,
      });
    }
  }, [currentUserChat]);

  useEffect(() => {
    if (readAll && newMessage) {
      const findIndex = _.findIndex(userList, (item) => {
        return item.info._id === newMessage.chat.from._id;
      });

      if (findIndex !== -1) {
        const list = userList;
        list[findIndex] = {
          ...list[findIndex],
          unRead: readAll.count,
        };
        setUserList([...list]);
      }
    }
  }, [readAll]);

  useEffect(() => {
    // socket.disconnect();
    socket.connect();
    setIsLoading(true);

    const historyChat = (value) => {
      if (value?.messages?.length) {
        setChatLogs(value?.messages);
      } else {
        setChatLogs([]);
      }
    };

    const receiveChatWith = (value: { _id: string; chatWith?: User[] }) => {
      setUserList(value?.chatWith);
      setIsLoading(false);
    };

    const receiveMessage = ({
      chat,
      totalUnread,
      totalUnreadWithUser,
    }: {
      chat: ReceiveMessage;
      totalUnread: number;
      totalUnreadWithUser: number;
    }) => {
      setNewMessage({ chat, totalUnread, totalUnreadWithUser });
    };

    const resetUnread = (value: any) => {
      setReadAll({
        user: currentUserChat,
        count: value,
      });
    };

    const timer = setTimeout(() => {
      socket.emit('FE_get_chat_with', {}, (value: any) => {
        console.log(value, 'this is messages');
      });
    }, 1000);
    // listener:
    // emit:

    socket.on('FE_receive_message', receiveMessage);
    socket.on('FE_receive_history_chat', historyChat);
    socket.on('FE_receive_chat_with', receiveChatWith);
    socket.on('FE_reset_unread_done', resetUnread);

    return () => {
      clearTimeout(timer);
      socket.off('FE_receive_history_chat', historyChat);
      socket.off('FE_receive_chat_with', receiveChatWith);
      socket.off('FE_receive_message', receiveMessage);
      socket.off('FE_reset_unread_done', resetUnread);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (newMessage) {
      const findIndex = _.findIndex(userList, (item) => {
        return item.info._id === newMessage.chat.from._id;
      });

      if (findIndex !== -1) {
        if (newMessage.chat.from._id === currentUserChat?._id) {
          const message = {
            body: newMessage.chat.body,
            createAt: newMessage.chat.createAt,
            to: newMessage.chat.to,
            from: newMessage.chat.from,
          };
          setChatLogs((prev) => (prev ? [...prev, message] : [message]));
          // emit read message
          socket.emit('FE_reset_unread', {
            withId: newMessage.chat.from._id,
          });
        }
        const list = userList;
        list[findIndex] = {
          ...list[findIndex],
          message: newMessage.chat.body,
          unRead: newMessage.totalUnread,
        };
        setUserList([...list]);
      } else {
        setUserList((prev) =>
          prev
            ? [
                ...prev,
                {
                  info: newMessage.chat.from,
                  lastTimeCommunicate: newMessage.chat.createAt,
                  message: newMessage.chat.body,
                  unRead: newMessage.totalUnread,
                  _id: 'anythings',
                },
              ]
            : [],
        );
      }
    }
  }, [newMessage]);

  const handleSendMessage = (message: MessageType) => {
    const newString = JSON.stringify(message);
    socket.emit('FE_send_message', { to: currentUserChat?._id, body: newString }, () => {
      console.log('done');
    });
  };

  const handleAddNewMessage = (message: chatLog) => {
    setChatLogs((prev) => (prev ? [...prev, message] : [message]));
  };

  return (
    <div
      style={{
        padding: '8px 200px',
        backgroundColor: '#e6e6e6',
        height: 'calc(100vh - 70px)',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '8px',
          borderRadius: '6px',
          display: 'flex',
          height: '600px',
        }}
      >
        <div style={{ flex: '.3' }}>
          <UserList
            userList={userList}
            setCurrentUserChat={setCurrentUserChat}
            isLoading={isLoading}
          />
        </div>
        <div style={{ flex: '.7', borderLeft: '1px solid #d9d9d9' }}>
          <ChatBox
            userNow={user}
            chatLogs={chatLogs}
            currentUserChat={currentUserChat}
            sendMessage={handleSendMessage}
            addNewMessage={handleAddNewMessage}
          />
        </div>
      </div>
    </div>
  );
}
