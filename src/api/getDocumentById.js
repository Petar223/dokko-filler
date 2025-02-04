import axiosInstance from "./axios";

const getDocumentsById = async (id) => {
  const response = await axiosInstance.get("/document?id=" + id);
  return response.data;
};

export default getDocumentsById;
