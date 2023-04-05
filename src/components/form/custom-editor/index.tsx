import dynamic from 'next/dynamic';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(import('react-quill'), { ssr: false });

interface Props {
  value?: string;
  onChange?: any;
}

const CustomFormEditor = ({ value, onChange }: Props) => {
  const handleOnChange = (value: string) => {
    onChange(value);
  };
  return (
    <div className='text-editor'>
      <ReactQuill
        value={value}
        onChange={handleOnChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link'],
          ],
        }}
      />
    </div>
  );
};

export default CustomFormEditor;
