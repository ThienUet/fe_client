import CustomUploadFile from 'components/form/custom-upload-file';
import React from 'react';

const Test = () => {
  return (
    <div>
      <CustomUploadFile name='images' type='image' label='Upload image'></CustomUploadFile>
    </div>
  );
};

export default Test;
