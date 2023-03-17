import {
  faCircleXmark,
  faFileCirclePlus,
  faPlus,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Form } from 'antd';
import React, { useState, useRef } from 'react';
import { handleUploadFile, handleDeleteFile } from './../../../utils/common';

interface fileDir {
  fileKey: string;
  fileUrl: string;
}

interface Props {
  style?: any;
  maxFileSize?: any;
  onChange?: any;
  type?: string;
  preId?: string;
  value?: fileDir[];
  previewStyle?: any;
}

interface InputButtonProps {
  index: number;
  type?: string;
  onChange?: any;
  value?: fileDir;
  previewStyle?: any;
  maxFileSize?: number;
}

const InputButton = ({
  index,
  type,
  onChange,
  value,
  previewStyle,
  maxFileSize,
}: InputButtonProps) => {
  const inputRef = useRef<any>(null);
  const fileAccept = () => {
    switch (type) {
      case 'image':
        return 'image/png, image/jpeg, image/jpg';
      case 'audio':
        return 'audio/*';
      case 'video':
        return 'video/*';
      default:
        return 'image/png, image/jpeg, image/jpg';
    }
  };

  const getFileExtension = (fileName: string) => {
    const lastDot = fileName.lastIndexOf('.');
    return fileName.substring(lastDot + 1);
  };

  const handleClickDelete = async (fileKey: string) => {
    try {
      await handleDeleteFile(fileKey);
      onChange({
        fileKey: '',
        fileUrl: '',
      });
    } catch (err) {
      // console.log(err);
    }
  };

  const handleInputOnChange = async (e: any, index: number) => {
    const { name } = e.target;
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      const fileDetail = e.target.files[0];
      const fileExtension = getFileExtension(fileDetail.name);
      const fileName = fileDetail.name;
      const newFile = new File([fileDetail], fileName, {
        type: fileDetail.type,
        lastModified: fileDetail.lastModified,
      });
      const fileSize = fileDetail.size;
      const fileSizeMb = fileSize / (1024 * 1024);
      const fileUploaded = await handleUploadFile(newFile, type, String(maxFileSize));
      console.log(fileUploaded);
      onChange({
        fileKey: fileUploaded,
        fileUrl: fileUploaded,
      });
    } catch (err) {
      onChange({
        fileKey: '',
        fileUrl: '',
      });
    }
  };

  const handleClickUpload = async () => {
    inputRef.current.click();
  };

  const renderPreview = (fileKey: string) => {
    if (fileKey) {
      return (
        <img
          onClick={() => window.open(fileKey)}
          style={{ width: '100%', borderRadius: 2 }}
          src={fileKey}
        ></img>
      );
    } else {
      return;
    }
  };

  return (
    <div>
      <div style={{ width: '100px', height: '100px' }}>
        {value?.fileUrl && (
          <div
            style={{
              width: 120,
              borderRadius: 8,
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            <Button
              style={{
                position: 'absolute',
                top: 4,
                right: 4,
                zIndex: 999999,
              }}
              shape='circle'
            >
              <FontAwesomeIcon
                icon={faTrashCan}
                onClick={() => handleClickDelete(value?.fileKey)}
              />
            </Button>
            {renderPreview(value.fileKey)}
          </div>
        )}
      </div>
      <div style={{ marginTop: '32px' }}>
        <input
          style={{ display: 'none' }}
          type='file'
          onChange={(e) => handleInputOnChange(e, index)}
          onClick={(e: any) => (e.target.value = null)}
          id={`file_upload_${index}`}
          accept={fileAccept()}
          ref={inputRef}
        ></input>
        <Button onClick={() => handleClickUpload()} shape='circle'>
          <FontAwesomeIcon icon={faFileCirclePlus} />
        </Button>
      </div>
    </div>
  );
};

const CustomUploadFiles = ({ style, type, maxFileSize, previewStyle }: Props) => {
  const handleCloseFileUpload = async (fileKey: string, remove: () => void) => {
    if (fileKey) {
      await handleDeleteFile(fileKey);
    }
    remove();
  };

  const renderUploadFileItem = () => {
    return (
      <Form.List
        name={'images'}
        rules={[
          {
            validator: async (_, images) => {
              if (!images.length) return Promise.reject(new Error('This field is required'));
              else return Promise.resolve();
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => {
          return (
            <div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '32px', flexWrap: 'wrap' }}>
                {fields.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      style={{
                        border: '1px solid #dadada',
                        padding: '8px',
                        borderRadius: '6px',
                        minWidth: '260px',
                        backgroundColor: 'rgb(230, 230, 230)',
                        position: 'relative',
                      }}
                    >
                      <Button
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          zIndex: '99999999999999999',
                        }}
                        shape='circle'
                        onClick={() => handleCloseFileUpload(item.fileKey, () => remove(index))}
                      >
                        <FontAwesomeIcon icon={faCircleXmark} />
                      </Button>
                      <Form.Item name={[index, 'file']} rules={[]}>
                        <InputButton
                          index={index}
                          type={type}
                          maxFileSize={maxFileSize}
                          previewStyle={[previewStyle]}
                        ></InputButton>
                      </Form.Item>
                    </div>
                  );
                })}
              </div>
              <Button
                style={{ marginTop: '8px ' }}
                color='secondary'
                onClick={() => add()}
                shape='circle'
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          );
        }}
      </Form.List>
    );
  };

  return (
    <div style={style}>
      <div style={{ border: '1px solid #dadada', borderRadius: '6px', padding: '12px 24px' }}>
        {renderUploadFileItem()}
      </div>
    </div>
  );
};

export default CustomUploadFiles;
