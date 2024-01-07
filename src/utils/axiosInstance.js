import axios from "axios";
import { BASE_URL } from "../constants/environment";
import tokenMethod from "./token";
import { message } from "antd";



const axiosInstance = axios.create({
    baseURL: BASE_URL,
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) =>{
      console.log("error",error);
      const originalRequest = error.config;
 /////Check lỗi 403 và 401
      if((error.response?.status === 403 ||error.response?.status === 401 ) &&  !!!originalRequest._retry){
        ///NẾu có lỗi 404 hoặc 401 và originalRequest._retry(false) thì...
        message.error("Email của bạn đã tồn tại")
        originalRequest._retry = true;
        //Gọi Api
        try {
          const res = await axiosInstance.put("/customer/refresh",{
            refreshToken: tokenMethod.get()?.refreshToken,
          })
          const {token: accessToken, refreshToken} = res?.data?.data || {};
               // Lưu lại token mới vào local storage hoặc cookie
        tokenMethod.set({
          accessToken,
          refreshToken,
        });
          // Thay đổi token trong header của yêu cầu ban đầu
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          // Gọi lại yêu cầu ban đầu với token mới
        return axiosInstance(originalRequest);
        } catch (error) {
          console.log(error);
          // Xử lý lỗi nếu không thể cập nhật token mới
          tokenMethod.remove();
        }
      }
      ////Nếu không có lỗi 403 và 401 thì trả về lỗi ban đầu
      return Promise.reject(error);
    }
    
  );
  // Interceptor cho phép can thiệp vào quá trình gửi yêu cầu (REQUEST) từ server.
  axiosInstance.interceptors.request.use(
    (config) =>{
      //Xu li yêu cầu trước khi gửi đi
      config.headers.Authorization = `Bearer ${tokenMethod.get()?.accessToken}`;
      return config;
    },
    (error)=>{
      // xử lý lỗi nếu có
    return Promise.reject(error);
    }
  )

  export default axiosInstance;
  

  // const about = () => { 

  //   if(true){
  //     // return 1jjjhjhjh
  //   }
  //   return 2
  //  }