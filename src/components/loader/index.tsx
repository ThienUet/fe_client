import React from 'react';
interface Props {
  showText: boolean;
  text: string;
}
const Loader = ({ showText, text }: Props) => {
  return (
    <div className='page-loader'>
      <div className='box-loader'>
        <div className='lds-ellipsis'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {/* <div className='loading' /> */}
        {showText && <h3 className='text-lg font-semibold text-body italic'>{text}</h3>}
      </div>
    </div>
  );
};

export default Loader;
