import axiosInstance from './httpClient';

const postPlaceholder = async (placeholder) => {
  const response = await axiosInstance.post('/case', placeholder);
  return { [placeholder.originalPlaceholder]: response.data.body };
};

export default postPlaceholder;
