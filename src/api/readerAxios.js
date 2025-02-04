import axios from "axios";

const readerAxiosInstance = axios.create({
  baseURL: process.env.READER_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

readerAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error) {
      const status = error.response.status;
      switch (status) {
        case 400:
          return Promise.reject({
            ...error,
            message: "Reader ID Bad Request (400): Please check your input.",
          });
        case 404:
          return Promise.reject({
            ...error,
            message: "Reader ID Not Found (404): Resource not found.",
          });
        default:
          return Promise.reject({
            ...error,
            message: `Reader ID Error occurred. Status: ${status}`,
          });
      }
    } else if (error.request) {
      return Promise.reject({
        ...error,
        message: "No response from the Reader ID server.",
        status: 0,
      });
    } else {
      return Promise.reject({
        ...error,
        message: "Error setting up the request: " + error.message,
      });
    }
  },
);

export default readerAxiosInstance;
