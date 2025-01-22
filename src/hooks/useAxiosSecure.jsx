import axios from "axios"
import useAuth from "./useAuth"


const axiosSecure = axios.create({
  baseURL: `https://job-zone.vercel.app`,
  withCredentials: true,
})


const useAxios = () => {
  const { logOut } = useAuth()
  axiosSecure.interceptors.response.use((response) => {
    return response;
  },
    (error) => {
      console.log(error);
      if (error.status === 403) {
        logOut()
      }
      return Promise.reject(error)
    })
  return axiosSecure
}


export default useAxios