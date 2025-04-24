import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 1000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
})

export default instance;

export const setAuthHeader = (token) => {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};


// axiosInstance.js
// instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
  
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
//         try {
//           const { data } = await instance.post('/auth/refresh-token'); // your refresh endpoint
//           localStorage.setItem('accessToken', data.accessToken);
//           setAuthHeader(data.accessToken);
//           originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
//           return instance(originalRequest);
//         } catch (err) {
//           localStorage.removeItem('accessToken');
//           window.location.href = '/login';
//           return Promise.reject(err);
//         }
//       }
  
//       return Promise.reject(error);
//     }
//   );
  
