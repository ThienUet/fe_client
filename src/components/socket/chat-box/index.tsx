import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Button, Divider } from 'antd';
import MiniFileUpload from 'components/form/mini-upload';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { MessageType, chatLog } from 'type/chat';
import { User } from 'type/user';

interface Props {
  chatLogs: chatLog[];
  currentUserChat: {
    _id: string;
    firstName: string;
    image: string;
    lastName: string;
  };
  sendMessage: (message: MessageType) => void;
  addNewMessage: (message: chatLog) => void;
  userNow: User;
}

const Log = ({
  chatLogs,
  currentUserChat,
}: {
  chatLogs: chatLog[];
  currentUserChat: {
    _id: string;
    firstName: string;
    image: string;
    lastName: string;
  };
}) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatLogs]);

  const renderMessItem = ({ type, image, link, text }: MessageType) => {
    switch (type) {
      case 'text':
        return text;
      case 'image':
        return (
          <div style={{ padding: '8px' }}>
            <img src={image} width={100} height={80} style={{ objectFit: 'contain' }}></img>
            <div>{text}</div>
          </div>
        );
      case 'link':
        return (
          <div>
            <a href={link} style={{ textDecoration: 'underline' }}>
              {text}
            </a>
          </div>
        );
      default:
        return text;
    }
  };
  return (
    <div>
      {chatLogs.map((item, index) => {
        const messItem: MessageType = JSON.parse(item.body);
        if (item.from._id === currentUserChat._id) {
          return (
            <div key={index} style={{ display: 'flex', alignItems: 'flex-end', marginTop: '2px' }}>
              <div>
                <Avatar src={currentUserChat?.image ? currentUserChat?.image : null} />
              </div>
              <div style={{ marginLeft: '8px', flex: '.8' }}>
                <div style={{ display: 'flex' }}>
                  <div
                    style={{
                      background: '#3399ff',
                      padding: '2px 12px',
                      borderRadius: '4px 20px 20px 20px',
                    }}
                  >
                    {renderMessItem(messItem)}
                  </div>
                </div>
              </div>
            </div>
          );
        } else {
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'end',
                width: '100%',
                marginTop: '2px',
              }}
            >
              <div style={{ marginLeft: '8px', flex: '.8' }}>
                <div style={{ display: 'flex', justifyContent: 'end' }}>
                  <div
                    style={{
                      background: '#3399ff',
                      padding: '2px 12px',
                      borderRadius: '20px 4px 20px 20px',
                    }}
                  >
                    {renderMessItem(messItem)}
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
      <div ref={scrollRef}></div>
    </div>
  );
};

const ChatBox = ({ chatLogs, currentUserChat, sendMessage, addNewMessage, userNow }: Props) => {
  const [messageText, setMessageText] = useState<string>('');
  const [file, setFile] = useState<{
    fileKey: string;
    fileUrl: string;
  }>();

  const isValidUrl = (urlString: string) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // validate fragment locator
    return !!urlPattern.test(urlString);
  };

  const handleSendMessage = () => {
    if (file && file.fileKey) {
      const newMessage: MessageType = {
        type: 'image',
        text: messageText,
        image: file.fileKey,
      };
      sendMessage(newMessage);
      addNewMessage({
        body: JSON.stringify(newMessage),
        createAt: '',
        from: {
          firstName: userNow.firstName,
          lastName: userNow.lastName,
          image: userNow.image,
          _id: userNow.userId,
        },
        to: currentUserChat,
      });
      setMessageText('');
      setFile(null);
    } else {
      if (isValidUrl(messageText)) {
        const newMessage: MessageType = {
          type: 'link',
          link: messageText,
          text: messageText,
        };
        sendMessage(newMessage);
        addNewMessage({
          body: JSON.stringify(newMessage),
          createAt: '',
          from: {
            firstName: userNow.firstName,
            lastName: userNow.lastName,
            image: userNow.image,
            _id: userNow.userId,
          },
          to: currentUserChat,
        });
        setMessageText('');
        setFile(null);
      } else {
        const newMessage: MessageType = {
          type: 'text',
          text: messageText,
        };
        sendMessage(newMessage);
        addNewMessage({
          body: JSON.stringify(newMessage),
          createAt: '',
          from: {
            firstName: userNow.firstName,
            lastName: userNow.lastName,
            image: userNow.image,
            _id: userNow.userId,
          },
          to: currentUserChat,
        });
        setMessageText('');
        setFile(null);
      }
    }
  };

  const handleFileOnChange = (file) => {
    setFile(file);
  };

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {currentUserChat ? (
        <div style={{ height: '100%' }}>
          <div style={{ marginLeft: '8px' }}>
            <Avatar
              style={{ width: '40px', height: '40px' }}
              src={currentUserChat?.image ? currentUserChat?.image : null}
            ></Avatar>
            <span style={{ marginLeft: '8px', fontWeight: '600' }}>
              {currentUserChat?.firstName + ' ' + currentUserChat?.lastName}
            </span>
          </div>
          <Divider />
          <div
            style={{
              height: 'calc(100% - 50px)',
              backgroundColor: 'white',
              paddingBottom: '40px',
              overflowY: 'scroll',
            }}
          >
            <Log chatLogs={chatLogs} currentUserChat={currentUserChat} />
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '0',
              left: '0',
              backgroundColor: 'white',
              width: '100%',
              padding: '0px 20px 0px 8px',
            }}
          >
            {file && (
              <div style={{ width: '100%', height: '100px' }}>
                <div style={{ width: '100%', height: '1px', backgroundColor: 'black' }}></div>
                <div
                  style={{
                    marginTop: '6px',
                    width: '84px',
                    height: '84px',
                    backgroundColor: '#e6e6e6',
                    borderRadius: '8px',
                    position: 'relative',
                  }}
                >
                  <Button
                    style={{ position: 'absolute', top: '-4px', right: '-4px' }}
                    shape='circle'
                    size='small'
                    icon={<FontAwesomeIcon icon={faXmark} />}
                  ></Button>
                  <img height={80} width={80} style={{ objectFit: 'contain' }} src={file.fileKey} />
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: '16px' }}>
              <MiniFileUpload type='image' onChange={handleFileOnChange} />
              <input
                value={messageText}
                onChange={(e: any) => {
                  setMessageText(e?.target?.value);
                }}
                style={{
                  flex: '1',
                  border: '1px solid #d9d9d9',
                  outline: 'none',
                  padding: '0px 16px',
                  borderRadius: '16px',
                }}
              />
              <Button
                shape='circle'
                onClick={handleSendMessage}
                disabled={messageText.length || file?.fileKey ? false : true}
                icon={<FontAwesomeIcon icon={faPaperPlane} />}
              ></Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontWeight: '700', fontSize: '1.4rem', color: '#8c8c8c' }}>
            Chọn người dùng để trò chuyện
          </span>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
