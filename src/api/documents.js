import axiosInstance from './httpClient';

const getDocuments = async () => {
  const response = await axiosInstance.get('GetListOfDocs');
  return response.data;
};

export default getDocuments;
