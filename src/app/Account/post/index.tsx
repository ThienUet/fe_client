import { useLoadScript } from '@react-google-maps/api';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Radio, Select, notification } from 'antd';
import CustomFormEditor from 'components/form/custom-editor';
import CustomUploadFile from 'components/form/custom-upload-file';
import CustomUploadFiles from 'components/form/custom-upload-files';
import CustomFormSelectLocation from 'components/form/map-position';
import DebounceSelect from 'components/form/search-select';
import HouseDetail from 'components/google-map/house-detail';
import { useGetProvinces, useGetDistricts, useGetWards, useCreateHouse } from 'libs/house-service';
import React, { useMemo, useState } from 'react';
import { Element, Link } from 'react-scroll';
import { createHouse } from 'services/house-services';
import { House } from '../../../type/house';
import { admitOptions, furnishedOptions, houseTypeOptions, trueFalseOptions } from 'utils/options';
import { Validation } from 'utils/validations';
import { useRouter } from 'next/router';

const CreateHouse = () => {
  const [form] = Form.useForm();
  const provinceWatch = Form.useWatch('province', form);
  const districtWatch = Form.useWatch('district', form);
  const [isOpenHouseDetail, setIsOpenHouseDetail] = useState<{ house: House; isOpen: boolean }>({
    house: null,
    isOpen: false,
  });
  const router = useRouter();

  const onError = () => {
    api['error']({
      message: 'Tạo bài đăng thất bại',
      description: 'Hãy tạo lại bài đăng',
    });
  };

  const [api, contextHolder] = notification.useNotification();

  const onSuccess = () => {
    api['success']({
      message: 'Tạo bài đăng thành công',
      description: 'Giờ đây mọi người đã có thể nhìn thấy bài đăng của bạn',
    });
    router.push('/post');
  };

  const createHouseMutation = useMutation({
    onError: onError,
    onSuccess: onSuccess,
    mutationFn: createHouse,
  });

  const { data: provinceList } = useGetProvinces();

  const { data: districtList } = useGetDistricts({ code: provinceWatch });

  const { data: wardList } = useGetWards({ code: districtWatch });

  const handleCloseHouseDetail = () => {
    setIsOpenHouseDetail({
      isOpen: false,
      house: null,
    });
  };

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
        visible: true,
      };
      setIsOpenHouseDetail({
        house: newHouse,
        isOpen: true,
      });
    });
  };

  const onFinish = (values: any) => {
    const newHouse: House = {
      ...values,
      thumbnail: values?.thumbnail?.fileKey,
      images: values?.images.map((item: any) => item.file.fileKey),
      latitude: values?.position?.lat,
      video: values?.video?.fileKey,
      longitude: values?.position?.lng,
      address: values?.position?.address,
    };

    createHouseMutation.mutate(newHouse);
  };

  // if (!isLoaded) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div style={{ padding: '8px 200px', backgroundColor: '#e6e6e6' }}>
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
        Đăng tin bất động sản miễn phí
      </div>
      <Form onFinish={onFinish} form={form} layout='horizontal'>
        <div
          style={{
            backgroundColor: 'white',
            padding: '16px 32px',
            borderRadius: '6px',
            marginBottom: '8px',
            gap: '32px',
            display: 'flex',
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
                <Radio.Button value='1'>Bán</Radio.Button>
                <Radio.Button value='2'>Cho thuê</Radio.Button>
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
            <Form.Item
              name='province'
              label='Tỉnh / thành'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <DebounceSelect options={provinceList} placeholder='Chọn tỉnh / thành' />
            </Form.Item>
            <Form.Item
              name='district'
              label='Quận / huyện'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <DebounceSelect
                options={districtList}
                placeholder='Chọn quận / huyện'
                isDisable={provinceWatch ? false : true}
              />
            </Form.Item>
            <Form.Item
              name='ward'
              label='Xã / phường'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <DebounceSelect
                options={wardList}
                placeholder='Chọn xã / phường'
                isDisable={districtWatch ? false : true}
              />
            </Form.Item>
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
            <Form.Item
              name='position'
              labelCol={{ style: { width: '120px', textAlign: 'start' } }}
              rules={[Validation.required]}
            >
              <CustomFormSelectLocation />
            </Form.Item>
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
          <Form.Item label='Hình thu nhỏ' name='thumbnail' rules={[Validation.required]}>
            <CustomUploadFile type='image'></CustomUploadFile>
          </Form.Item>
          <Form.Item label='Nhiều ảnh' name='images' rules={[Validation.required]}>
            <CustomUploadFiles type='image' />
          </Form.Item>
          <Form.Item label='Video (nếu có)' name='video'>
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

export default CreateHouse;
