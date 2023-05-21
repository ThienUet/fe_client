import React, { useRef, useState } from 'react';
import { handleDeleteFile, handleUploadFile } from './../../../utils/common';
import ReactPlayer from 'react-player';
import { Button, Progress } from 'antd';
import { faFileArrowUp, faTrashCan } from '@fortawesome/free-solid-svg-icons';
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

const MiniFileUpload = ({ style, onChange, type, maxFileSize, previewStyle, value }: Props) => {
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

  const [progress, setProgress] = useState<number>(null);

  const [err, setErr] = useState<string>('');
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleInputOnChange = async (e: any) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;
      const fileDetail = e.target.files[0];
      const fileName = fileDetail.name;
      const newFile = new File([fileDetail], fileName, {
        type: fileDetail.type,
        lastModified: fileDetail.lastModified,
      });
      const fileUploaded = await handleUploadFile(newFile, type, setProgress);
      onChange({
        fileKey: fileUploaded,
        fileUrl: fileUploaded,
      });
    } catch (err) {
      onChange(null);
    }
  };

  const handleClickDelete = async () => {
    const fileKey = value.fileKey;
    onChange(null);
    try {
      await handleDeleteFile(fileKey);
    } catch (err: any) {
      setErr(err);
    }
  };

  const handleClickUpload = async () => {
    uploadInputRef?.current?.click();
  };

  return (
    <div style={style}>
      <input
        style={{ display: 'none' }}
        type='file'
        onChange={(e) => handleInputOnChange(e)}
        onClick={(e: any) => (e.target.value = null)}
        id={`image_upload`}
        accept={fileAccept()}
        ref={uploadInputRef}
      ></input>
      <Button onClick={() => handleClickUpload()} shape='circle'>
        <FontAwesomeIcon icon={faFileArrowUp} />
      </Button>
    </div>
  );
};

export default MiniFileUpload;
