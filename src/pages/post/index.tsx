import { Button, Table } from 'antd';
import { ColumnType } from 'antd/es/table';
import { useGetMyPostList } from 'libs/house-service';
import React, { useEffect, useState } from 'react';
import { House, HouseEditable, HouseListParams } from 'type/house';
import { User } from 'type/user';
import Router from 'next/router';
import CustomImage from 'components/google-map/custom-image';
import { useMutation } from '@tanstack/react-query';
import { editHouseDetail } from 'services/house-services';
import _ from 'lodash';

interface Props {
  user: User;
  userRefetch: () => void;
}

const PostList = ({ user, userRefetch }: Props) => {
  const [paramsList, setParamsList] = useState<HouseListParams>({
    ownerId: null,
    queryFor: null,
    queryType: null,
  });

  const [houses, setHouses] = useState<House[]>([]);

  const { data, isLoading } = useGetMyPostList(paramsList);

  useEffect(() => {
    data?.houses && setHouses(data.houses);
  }, [data?.houses]);

  useEffect(() => {
    if (user?.userId) {
      setParamsList({ ownerId: user.userId, queryFor: 'normal', queryType: 'all' });
    }
  }, [user]);

  const onError = () => {
    // console.log('error');
  };

  const onSuccess = (id: string) => {
    const index = _.findIndex(data.houses, (item: House) => item?.houseId === id);
    const newArray = data.houses;
    newArray[index] = {
      ...newArray[index],
      visible: !newArray[index].visible,
    };
    setHouses([...newArray]);
  };

  const { mutate: editPostMutation, isLoading: loading } = useMutation({
    onError: onError,
    onSuccess: (_, { data, id }) => onSuccess(id),
    mutationFn: ({ data, id }: { data: HouseEditable; id: string }) =>
      editHouseDetail({ data, id }),
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
      title: 'title',
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
              Edit
            </Button>
            <Button>delete</Button>
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
            {record.visible ? (
              <Button onClick={() => handleCliclSetInvisible(record.houseId)}>Active</Button>
            ) : (
              <Button onClick={() => handleClickSetVisible(record.houseId)}>Hidden</Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ padding: '8px' }}>
      <p>Danh sách bài đăng</p>
      <Table columns={columns} dataSource={houses} rowKey={(record) => record.houseId}></Table>
    </div>
  );
};

export default PostList;
