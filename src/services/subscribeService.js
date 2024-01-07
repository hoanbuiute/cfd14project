import axiosInstance from "../utils/axiosInstance";



///Post Form
export const subscribeService = {
    postSubscribe( payload = {}) {
      return axiosInstance.post(`/subscribes`,payload);
    },
 
  };