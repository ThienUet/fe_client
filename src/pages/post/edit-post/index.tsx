import { useLoadScript } from '@react-google-maps/api';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Radio, Select, notification } from 'antd';
import CustomFormEditor from 'components/form/custom-editor';
import CustomUploadFile from 'components/form/custom-upload-file';
import CustomUploadFiles from 'components/form/custom-upload-files';
import HouseDetail from 'components/google-map/house-detail';
import MapPosition from 'components/google-map/select-position';
import style from './style.module.scss';

import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { createHouse, editHouseDetail, getHouseDetail } from 'services/house-services';
import { House, HouseEditable } from 'type/house';
import { admitOptions, furnishedOptions, houseTypeOptions, trueFalseOptions } from 'utils/options';
import { Validation } from 'utils/validations';

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const [isOpenHouseDetail, setIsOpenHouseDetail] = useState<{ house: House; isOpen: boolean }>({
    house: null,
    isOpen: false,
  });

  const handleCloseHouseDetail = () => {
    setIsOpenHouseDetail({
      isOpen: false,
      house: null,
    });
  };

  const onError = () => {
    api['error']({
      message: 'Chỉnh sửa bài đăng thất bại',
      description: 'Hãy chỉnh sửa lại',
    });
  };

  const [api, contextHolder] = notification.useNotification();

  const onSuccess = () => {
    api['success']({
      message: 'Chỉnh sửa bài đăng thành công',
      description: 'Giờ đây thông tin của bài đăng đã được cập nhật',
    });
  };

  const { mutate: editPostMutation, isLoading: loading } = useMutation({
    onError: onError,
    onSuccess: onSuccess,
    mutationFn: ({ data, id }: { data: HouseEditable; id: string }) =>
      editHouseDetail({ data, id }),
  });

  const houseConvert = () => {
    form.validateFields().then((values: any) => {
      const newHouse: House = {
        ...values,
        thumbnail: values?.thumbnail?.fileKey,
        images: values?.images.map((item: any) => item.file.fileKey),
        video: values?.video?.fileKey,
        latitude: values?.position?.lat,
        longitude: values?.position?.lng,
        address: values?.position?.address,
      };
      setIsOpenHouseDetail({
        house: newHouse,
        isOpen: true,
      });
    });
  };

  const onFinish = (values: any) => {
    const newHouse: HouseEditable = {
      ...values,
      thumbnail: values?.thumbnail?.fileKey,
      images: values?.images.map((item: any) => item.file.fileKey),
      latitude: values?.position?.lat,
      video: values?.video?.fileKey,
      longitude: values?.position?.lng,
      address: values?.position?.address,
    };
    editPostMutation({ data: newHouse, id: id as string });
  };

  const houseDetail: { data: any; mutate: any } = useMutation(getHouseDetail);

  useEffect(() => {
    if (id && typeof id === 'string') {
      houseDetail.mutate({ id: id });
    }
  }, [id]);

  const getInitialValue = () => {
    const newForm = {
      ...houseDetail.data,
      thumbnail: {
        fileKey: houseDetail.data?.thumbnail,
        fileUrl: houseDetail.data?.thumbnail,
      },
      images: houseDetail.data?.images?.map((item: any) => ({
        file: {
          fileKey: item,
          fileUrl: item,
        },
      })),
      video: {
        fileKey: houseDetail.data?.video,
        fileUrl: houseDetail.data?.video,
      },
      position: {
        lat: houseDetail.data?.latitude,
        lng: houseDetail.data?.longitude,
        address: houseDetail.data?.address,
      },
    };
    return newForm;
  };

  useEffect(() => {
    const newForm = getInitialValue();
    form.setFieldsValue({ ...newForm });
  }, [houseDetail.data]);

  return (
    <div
      style={{ padding: '8px 200px', backgroundColor: '#e6e6e6' }}
      className={style.editPostContainer}
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
        Chỉnh sửa bài đăng
      </div>
      <Form onFinish={onFinish} form={form} layout='horizontal' initialValues={getInitialValue()}>
        <div
          style={{
            display: 'flex',
            gap: '32px',
            backgroundColor: 'white',
            padding: '16px 32px',
            borderRadius: '6px',
            marginBottom: '8px',
          }}
        >
          <div style={{ flex: '1' }}>
            <Form.Item
              name='title'
              label='Tiêu đề'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <Input placeholder='Nhập tiêu đề' />
            </Form.Item>
            <Form.Item
              name='houseCategory'
              label='Thể loại'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <Radio.Group buttonStyle='solid'>
                <Radio.Button value={1}>Bán</Radio.Button>
                <Radio.Button value={2}>Cho thuê</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name='houseType'
              label='Loại hình'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <Select placeholder='Chọn loại hình' options={houseTypeOptions} />
            </Form.Item>
            <div>
              <p className={style.addressElipsis}>
                <span style={{ width: '120px', display: 'inline-block' }}>Địa chỉ:</span>
                <span>{houseDetail.data?.address}</span>
              </p>
            </div>
            <Form.Item
              name='description'
              label='Mô tả'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <CustomFormEditor />
            </Form.Item>
          </div>
          <div style={{ flex: '1' }}>
            <MapPosition
              value={{ lat: houseDetail.data?.latitude, lng: houseDetail.data?.longitude }}
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '32px',
            backgroundColor: 'white',
            padding: '16px 32px',
            borderRadius: '6px',
            marginBottom: '8px',
          }}
        >
          <div style={{ flex: '1' }}>
            <Form.Item
              name='price'
              label='Giá tiền (VND)'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <Input type='number' placeholder='Nhập giá tiền' />
            </Form.Item>
            <Form.Item
              name='square'
              label='Diện tích (m2)'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <Input type='number' placeholder='Nhập diện tích' />
            </Form.Item>
            <Form.Item
              name='ac'
              label='Điều hòa'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <Radio.Group defaultValue='any' buttonStyle='solid'>
                {trueFalseOptions.map((item, index) => {
                  return (
                    <Radio.Button key={index} value={item.value}>
                      {item.label}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name='parking'
              label='Chỗ đỗ xe'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <Radio.Group defaultValue='any' buttonStyle='solid'>
                {trueFalseOptions.map((item, index) => {
                  return (
                    <Radio.Button key={index} value={item.value}>
                      {item.label}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name='elevator'
              label='Thang máy'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <Radio.Group defaultValue='any' buttonStyle='solid'>
                {trueFalseOptions.map((item, index) => {
                  return (
                    <Radio.Button key={index} value={item.value}>
                      {item.label}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name='pet'
              label='Thú cưng'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <Radio.Group defaultValue='any' buttonStyle='solid'>
                {admitOptions.map((item, index) => {
                  return (
                    <Radio.Button key={index} value={item.value}>
                      {item.label}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </Form.Item>
          </div>
          <div style={{ flex: '1' }}>
            <Form.Item
              name='bathRooms'
              label='Phòng tắm'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <Input type='number' placeholder='Nhập số phòng tắm' />
            </Form.Item>
            <Form.Item
              name='bedRooms'
              label='Phòng ngủ'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <Input type='number' placeholder='Nhập số phòng ngủ' />
            </Form.Item>
            <Form.Item
              name='maintainFee'
              label='Duy trì (VND)'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <Input type='number' placeholder='Nhập phí duy trì' />
            </Form.Item>
            <Form.Item
              name='furnished'
              label='Tiện nghi'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <Radio.Group defaultValue='any' buttonStyle='solid'>
                {furnishedOptions.map((item, index) => {
                  return (
                    <Radio.Button key={index} value={item.value}>
                      {item.label}
                    </Radio.Button>
                  );
                })}
              </Radio.Group>
            </Form.Item>
          </div>
        </div>
        <div
          style={{
            backgroundColor: 'white',
            padding: '16px 32px',
            borderRadius: '6px',
            marginBottom: '8px',
          }}
        >
          <Form.Item name='thumbnail' rules={[Validation.required]}>
            <CustomUploadFile type='image'></CustomUploadFile>
          </Form.Item>
          <Form.Item name='images' rules={[Validation.required]}>
            <CustomUploadFiles type='image' />
          </Form.Item>
          <Form.Item name='video' rules={[Validation.required]}>
            <CustomUploadFile type='video'></CustomUploadFile>
          </Form.Item>
        </div>
        <div
          style={{
            backgroundColor: 'white',
            padding: '16px 32px',
            borderRadius: '6px',
            marginBottom: '8px',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            // justifyContent: 'center',
          }}
        >
          {/* <Form.Item> */}
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
          {/* </Form.Item> */}
          {/* <Form.Item> */}
          <Button type='primary' onClick={houseConvert}>
            Xem trước
          </Button>
          {/* </Form.Item> */}
        </div>
      </Form>
      <HouseDetail
        isOpen={isOpenHouseDetail.isOpen}
        handleClose={handleCloseHouseDetail}
        data={isOpenHouseDetail.house}
      />
    </div>
  );
};

export default EditPost;
