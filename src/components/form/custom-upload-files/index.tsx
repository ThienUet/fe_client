/* eslint-disable react/display-name */
import { Button } from 'antd';
import React, { forwardRef, useState, useRef } from 'react';
import { handleUploadFile, handleDeleteFile } from './../../../utils/common';
// import { IValidator } from 'utils/validate';
// import { FormControl, IconButton, FormHelperText, Typography, Box } from '@mui/material';
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import UploadFileIcon from '@mui/icons-material/UploadFile';
// import CloseIcon from '@mui/icons-material/Close';

interface fileDir {
  fileKey: string;
  fileUrl: string;
}

interface Props {
  style?: any;
  name: string;
  maxFileSize: any;
  onChange?: any;
  type?: string;
  preId?: string;
  label: string;
  value?: fileDir[];
  previewStyle?: any;
}

interface InputButtonProps {
  name: string;
  index: number;
  type?: string;
  onChange: any;
  preId?: string;
}

const InputButton = ({ name, index, type, onChange, preId }: InputButtonProps) => {
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

  const handleInputOnChange = (e: any, index: number) => {
    onChange(e, index);
  };

  const handleClickUpload = async () => {
    inputRef.current.click();
  };

  return (
    <div style={{ marginTop: '32px' }}>
      <input
        style={{ display: 'none' }}
        name={name}
        type='file'
        onChange={(e) => handleInputOnChange(e, index)}
        onClick={(e: any) => (e.target.value = null)}
        id={`${preId}_${name}_${index}`}
        accept={fileAccept()}
        ref={inputRef}
      ></input>
      <Button onClick={() => handleClickUpload()}>{/* <UploadFileIcon></UploadFileIcon> */}</Button>
    </div>
  );
};

const CustomFormUploadFiles = forwardRef(
  (
    {
      style,
      name,
      onChange,
      type,
      preId,
      maxFileSize,
      label,
      value = [{ fileKey: '', fileUrl: '' }],
      previewStyle,
    }: Props,
    ref: any,
  ) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<string>('');

    const getFileExtension = (fileName: string) => {
      const lastDot = fileName.lastIndexOf('.');
      return fileName.substring(lastDot + 1);
    };

    const renderPreview = (fileUrl: string) => {
      if (fileUrl) {
        const link = fileUrl;
        return (
          <img
            onClick={() => window.open(link)}
            style={{ width: '100%', borderRadius: 8 }}
            src={link}
          ></img>
        );
      } else {
        return;
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
        setLoading(true);
        const fileUploaded = await handleUploadFile(newFile, type, String(maxFileSize));

        const newArray = value;
        newArray[index] = {
          fileKey: fileUploaded.data,
          fileUrl: fileUploaded.data,
        };
        onChange({
          [name]: newArray,
        });
      } catch (err) {
        const newArray = value;
        newArray[index] = {
          fileKey: '',
          fileUrl: '',
        };
        onChange({
          [name]: newArray,
        });
      }
    };

    const handleClickDelete = async (index: number) => {
      try {
        await handleDeleteFile(value[index].fileKey);
        const newArray = value;
        newArray[index] = {
          fileKey: '',
          fileUrl: '',
        };
        onChange({
          [name]: newArray,
        });
      } catch (err: any) {
        setErr(err);
      }
    };

    const handleAddFile = () => {
      onChange({
        [name]: [
          ...value,
          {
            fileKey: '',
            fileUrl: '',
          },
        ],
      });
    };

    const handleCloseFileUpload = async (index: number) => {
      if (value[index].fileKey) {
        await handleDeleteFile(value[index].fileKey);
      }
      const newArray = value;
      newArray.splice(index, 1);
      onChange({
        [name]: newArray,
      });
    };

    const renderUploadFileItem = () => {
      return value.map((item: any, index: any) => {
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
              style={{ position: 'absolute', top: 0, right: 0 }}
              onClick={() => handleCloseFileUpload(index)}
            >
              {/* <CloseIcon></CloseIcon> */}
            </Button>
            <div style={{ width: '100px', height: '100px' }}>
              {value[index].fileUrl && (
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
                      backgroundColor: 'white',
                      padding: 0.5,
                    }}
                    color='secondary'
                    onClick={() => handleClickDelete(index)}
                  >
                    {/* <DeleteOutlineIcon sx={{ fontSize: '1.1rem' }} /> */}
                  </Button>
                  {renderPreview(value[index].fileUrl)}
                </div>
              )}
            </div>

            <InputButton
              name={name}
              index={index}
              type={type}
              onChange={handleInputOnChange}
              preId={preId}
            ></InputButton>
          </div>
        );
      });
    };

    return (
      <div style={style}>
        <p>{label}</p>
        <div style={{ border: '1px solid #dadada', borderRadius: '6px', padding: '12px 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '32px' }}>
            {renderUploadFileItem()}
          </div>
          <p id='my-helper-text'>{err}</p>
          <div>
            <Button
              style={{
                top: 4,
                right: 4,
                zIndex: 999,
                backgroundColor: 'white',
                padding: 0.5,
                // '&:hover': {
                //   backgroundColor: '#cccccc',
                // },
              }}
              color='secondary'
              onClick={handleAddFile}
            >
              {/* <AddCircleIcon sx={{ fontSize: '1.8rem' }}></AddCircleIcon> */}
            </Button>
          </div>
        </div>
      </div>
    );
  },
);

export default CustomFormUploadFiles;
