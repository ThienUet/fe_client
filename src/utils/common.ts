import * as Auth from './../storages/Auth';
import { axiosUtlis } from './axiosInstance';
import { EventSourcePolyfill } from 'event-source-polyfill';

//Upload File
const uploadApi = (
  file: any,
  fileType: any,
  setProgress?: React.Dispatch<React.SetStateAction<number>>,
) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    const token = Auth.getToken();
    const progress = new EventSourcePolyfill('https://huydt.online/api/progress', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    progress.addEventListener('GUID', async (event: any) => {
      const guidValue = event.data;

      progress.addEventListener('progress', (event: any) => {
        const result = JSON.parse(event.data);
        setProgress(result);

        if (result === '100') {
          progress.close();
        }

        progress.addEventListener('complete', (event: any) => {
          if (event.data === 'complete') {
            setProgress(100);
            progress.close();
          }
        });
      });

      formData.append('GUID', guidValue);
      formData.append('file', file);
      formData.append('file_type', fileType);
      const res = await axiosUtlis._post('api/file', formData, {
        'Content-Type': 'multipart/form-data',
      });
      resolve(res);
    });
  });
};

// get progress
export const handleUploadFile = async (
  file: any,
  fileType: any,
  setProgress?: React.Dispatch<React.SetStateAction<number>>,
): Promise<any> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await uploadApi(file, fileType, setProgress);
    return res;
  } catch (err) {
    throw err;
  }
};

export const handleDeleteFile = async (fileKey: any): Promise<any> => {
  // split file name
  const fileName = fileKey.split('/')[3];
  const res = await axiosUtlis.f_delete('api/file', { images: [fileName] });
  return res;
};
