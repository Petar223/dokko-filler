import axiosInstance from "./readerAxios";

const health = async () => {
  const response = await axiosInstance.get("/health");
  return response.data;
};

export default health;
