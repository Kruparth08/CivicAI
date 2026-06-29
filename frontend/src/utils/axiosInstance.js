import axios from "axios";


const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

  // console.log("Axios Base URL:", axiosInstance.defaults.baseURL);


export default axiosInstance;