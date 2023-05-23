import { Button, Table, notification } from 'antd';
import { useGetMyPostList } from 'libs/house-service';
import React, { useEffect, useState } from 'react';
import { House, HouseEditable, HouseListParams } from 'type/house';
import { User } from 'type/user';
import Router from 'next/router';
import CustomImage from 'components/google-map/custom-image';
import { useMutation } from '@tanstack/react-query';
import { deleteHouse, editHouseDetail } from 'services/house-services';
import _ from 'lodash';
import FireBaseMessagingLayout from 'components/fcm';

interface Props {
  user: User;
  userRefetch: () => void;
}

const PostList = ({ user }: Props) => {
  const [paramsList, setParamsList] = useState<HouseListParams>({
    ownerId: null,
    queryFor: null,
    queryType: null,
    showInvisible: true,
  });

  const [houses, setHouses] = useState<House[]>([]);
  const [api, contextHolder] = notification.useNotification();

  const { data, isLoading } = useGetMyPostList(paramsList);

  useEffect(() => {
    data?.houses && setHouses(data.houses);
  }, [data?.houses]);

  useEffect(() => {
    if (user?.userId) {
      setParamsList({
        ownerId: user.userId,
        queryFor: 'normal',
        queryType: 'all',
        showInvisible: true,
      });
    }
  }, [user]);

  const onError = () => {
    // console.log('error');
  };

  const onSuccess = (id: string) => {
    api['success']({
      message: 'Thay đổi trạng thái thành công',
      description: 'Trạng thái của bài đăng đã được thay đổi',
    });

    const index = _.findIndex(data.houses, (item: House) => item?.houseId === id);
    const newArray = data.houses;
    newArray[index] = {
      ...newArray[index],
      isVisible: !newArray[index].isVisible,
    };
    setHouses([...newArray]);
  };

  const { mutate: editPostMutation, isLoading: loading } = useMutation({
    onError: onError,
    onSuccess: (_, { data, id }) => onSuccess(id),
    mutationFn: ({ data, id }: { data: HouseEditable; id: string }) => {
      return editHouseDetail({ data, id });
    },
  });

  const useDeleteHouse = useMutation({
    onError: (_) => {
      console.log('error');
    },
    onSuccess: (_, { id }) => {
      api['success']({
        message: 'Xóa bài đăng thành công',
        description: 'Bài đăng đã được xóa khỏi hệ thống',
      });
      const newArray = houses.filter((item) => item.houseId !== id);
      setHouses([...newArray]);
    },
    mutationFn: ({ id }: { id: string }) => {
      return deleteHouse({ id });
    },
  });

  const handleClickSetVisible = (id: string) => {
    if (id) {
      editPostMutation({ data: { visible: true }, id: id });
    }
  };

  const handleCliclSetInvisible = (id: string) => {
    if (id) {
      editPostMutation({ data: { visible: false }, id: id });
    }
  };

  const columns = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (text) => (
        <CustomImage src={text} style={{ height: '100px', width: '100px', objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record: House) => {
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              onClick={() => {
                Router.push(`/post/edit-post?id=${record.houseId}`);
              }}
            >
              Chỉnh sửa
            </Button>
            <Button
              onClick={() => {
                useDeleteHouse.mutate({ id: record.houseId });
              }}
            >
              Xóa bài viết
            </Button>
          </div>
        );
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record: House) => {
        return (
          <div>
            {record.isVisible ? (
              <Button onClick={() => handleCliclSetInvisible(record.houseId)}>Hiện</Button>
            ) : (
              <Button onClick={() => handleClickSetVisible(record.houseId)}>Ẩn</Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <FireBaseMessagingLayout user={user}>
      <div
        style={{
          padding: '8px 200px',
          backgroundColor: '#e6e6e6',
          minHeight: 'calc(100vh - 70px)',
        }}
      >
        {contextHolder}
        <div
          style={{
            backgroundColor: 'white',
            padding: '16px 32px',
            borderRadius: '6px',
            marginBottom: '8px',
            fontSize: '1.6rem',
            fontWeight: '600',
          }}
        >
          Danh sách bài đăng
        </div>
        <Table columns={columns} dataSource={houses} rowKey={(record) => record.houseId}></Table>
      </div>
    </FireBaseMessagingLayout>
  );
};

export default PostList;
