import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mock-backend-hintro.vercel.app",
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;