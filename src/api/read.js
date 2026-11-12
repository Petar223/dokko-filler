import axiosInstance from './readerAxios';

// Returns the card fields as delivered by the reader, e.g. { GivenName, ... }.
const read = async () => {
  const response = await axiosInstance.get('/read');
  return response.data;
};

export default read;
