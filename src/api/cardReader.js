import axiosInstance from './readerClient';

const read = async () => {
  const response = await axiosInstance.get('/read');
  return response.data;
};

export default read;
