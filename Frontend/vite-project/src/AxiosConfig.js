import axios from "axios";

const Instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
  withCredentials: true, 
});

export default Instance;
