import * as Auth from './../storages/Auth';
import { axiosUtlis } from './axiosInstance';
import { EventSourcePolyfill } from 'event-source-polyfill';

const uploadApi = (file: any, fileType: any) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    const token = Auth.getToken();
    const progress = new EventSourcePolyfill('http://103.162.20.167/api/progress', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    progress.addEventListener('GUID', async (event: any) => {
      const guidValue = event.data;

      progress.addEventListener('progress', (event: any) => {
        const result = JSON.parse(event.data);
        if (result === '100') {
          progress.close();
        }
        progress.addEventListener('complete', (event: any) => {
          if (event.data === 'complete') {
            progress.close();
          }
        });
      });

      formData.append('GUID', guidValue);
      formData.append('file', file);
      formData.append('file_type', fileType);
      console.log(formData);
      const res = await axiosUtlis._post('api/file', formData, {
        'Content-Type': 'multipart/form-data',
      });
      resolve(res);
    });
  });
};

export const handleUploadFile = async (file: any, fileType: any, limit?: string): Promise<any> => {
  // get progress
  const res = await uploadApi(file, fileType);
  return res;
};

export const handleDeleteFile = async (fileKey: any): Promise<any> => {
  // split file name
  const fileName = fileKey.split('/')[3];
  const res = await axiosUtlis.f_delete('api/file', { images: [fileName] });
  return res;
};
