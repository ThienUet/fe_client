import { useLoadScript } from '@react-google-maps/api';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Input, Radio, Select } from 'antd';
import CustomFormEditor from 'components/form/custom-editor';
import CustomUploadFile from 'components/form/custom-upload-file';
import CustomUploadFiles from 'components/form/custom-upload-files';
import HouseDetail from 'components/google-map/house-detail';
import MapPosition from 'components/google-map/select-position';
import style from './style.module.scss';

import { useGetProvinces, useGetDistricts, useGetWards } from 'libs/house-service';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { createHouse, getHouseDetail } from 'services/house-services';
import { House } from 'type/house';
import { admitOptions, furnishedOptions, houseTypeOptions, trueFalseOptions } from 'utils/options';
import { Validation } from 'utils/validations';

const EditPost = () => {
  const router = useRouter();
  const { id } = router.query;
  const libraries = useMemo(() => ['places'], []);
  const [form] = Form.useForm();
  const provinceWatch = Form.useWatch('province', form);
  const districtWatch = Form.useWatch('district', form);
  const [isOpenHouseDetail, setIsOpenHouseDetail] = useState<{ house: House; isOpen: boolean }>({
    house: null,
    isOpen: false,
  });

  const createHouseMutation = useMutation(createHouse);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAT-29Vo1xQZU4nCKMCgvKfRivVJ2KkHhU',
    libraries: libraries as any,
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

  const houseDetail: { data: any; mutate: any } = useMutation(getHouseDetail);

  useEffect(() => {
    if (id && typeof id === 'string') {
      houseDetail.mutate({ id: id });
    }
  }, [id]);

  useEffect(() => {
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

    form.setFieldsValue({ ...newForm });
  }, [houseDetail.data]);

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div
      style={{ padding: '8px 200px', backgroundColor: '#a6a6a6' }}
      className={style.editPostContainer}
    >
      <div>Đăng tin bất động sản miễn phí</div>
      <Form onFinish={onFinish} form={form} layout='horizontal'>
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
                <Radio.Button value={1}>For sell</Radio.Button>
                <Radio.Button value={2}>For lease</Radio.Button>
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
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type='primary' onClick={houseConvert}>
            Xem trước
          </Button>
        </Form.Item>
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
