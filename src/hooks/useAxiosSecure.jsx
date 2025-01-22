import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: `https://job-zone.vercel.app`,
  withCredentials: true,
});

const useAxios = () => {
  const { logOut } = useAuth();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error(error);
        if (error.response && error.response.status === 403) {
          logOut();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(interceptor);
    };
  }, [logOut]);

  return axiosSecure;
};

export default useAxios;
