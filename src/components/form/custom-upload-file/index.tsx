import React, { useRef, useState } from 'react';
import { handleDeleteFile, handleUploadFile } from './../../../utils/common';
import ReactPlayer from 'react-player';
import { Button } from 'antd';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface fileDir {
  fileKey: string;
  fileUrl: string;
}

interface Props {
  style?: any;
  maxFileSize?: any;
  onChange?: any;
  type: 'image' | 'audio' | 'video';
  previewStyle?: any;
  value?: fileDir;
}

const CustomUploadFile = ({ style, onChange, type, maxFileSize, previewStyle, value }: Props) => {
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

  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const getFileExtension = (fileName: string) => {
    const lastDot = fileName.lastIndexOf('.');
    return fileName.substring(lastDot + 1);
  };

  const renderPreview = (fileUrl: string) => {
    if (fileUrl) {
      switch (type) {
        case 'image':
          return (
            <img
              onClick={() => window.open(fileUrl)}
              style={{ width: '100%', borderRadius: 8 }}
              src={fileUrl}
            ></img>
          );
        case 'video':
          return <ReactPlayer width={500} height={'100%'} controls url={fileUrl}></ReactPlayer>;
      }
    } else {
      return;
    }
  };

  const handleInputOnChange = async (e: any) => {
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
      setLoading(true);
      const fileUploaded = await handleUploadFile(newFile, type, String(maxFileSize));
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

  const handleClickDelete = async () => {
    const fileKey = value.fileKey;
    onChange({
      fileKey: '',
      fileUrl: '',
    });
    try {
      await handleDeleteFile(fileKey);
    } catch (err: any) {
      // console.log(err);
    }
  };

  const handleClickUpload = async () => {
    uploadInputRef?.current?.click();
  };

  return (
    <div style={style}>
      {' '}
      <div
        style={{
          border: `1px solid ${err ? '#d32f2f' : 'rgb(240, 240, 240)'}`,
          padding: '8px',
          borderRadius: '6px',
          minWidth: '260px',
          backgroundColor: 'rgb(240, 240, 240)',
          position: 'relative',
        }}
      >
        <div style={{ width: '100px', height: '100px' }}>
          {value?.fileUrl && (
            <div
              style={
                previewStyle
                  ? previewStyle
                  : {
                      width: 120,
                      borderRadius: 8,
                      cursor: 'pointer',
                      position: 'relative',
                    }
              }
            >
              <Button
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  zIndex: 999999,
                  padding: 0.5,
                }}
                onClick={() => handleClickDelete()}
                shape='circle'
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
              {renderPreview(value.fileUrl)}
            </div>
          )}
        </div>

        <div style={{ marginTop: '32px' }}>
          <input
            style={{ display: 'none' }}
            type='file'
            onChange={(e) => handleInputOnChange(e)}
            onClick={(e: any) => (e.target.value = null)}
            id={`image_upload`}
            accept={fileAccept()}
            ref={uploadInputRef}
          ></input>
          <Button onClick={() => handleClickUpload()}>Tải ảnh lên</Button>
        </div>
      </div>
    </div>
  );
};

export default CustomUploadFile;
