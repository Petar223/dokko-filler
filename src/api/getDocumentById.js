import axiosInstance from './axios';

const getDocumentById = async (id) => {
  const response = await axiosInstance.get('/document', { params: { id } });
  return response.data;
};

export default getDocumentById;
