import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

let apiClient: AxiosInstance;

const createApiClient = (baseURL: string, token?: string): AxiosInstance => {
  const client = axios.create({
    baseURL,
  });

  // Request interceptor to start loader
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      config.headers = config.headers || {};
      config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';
      if (localStorage.getItem('token')) {
        config.headers['token'] = localStorage.getItem('token') || '';
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to stop loader
  client.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      return response;
    },
    (error: AxiosError) => {
      if(error.response?.status === 401){
        localStorage.clear();
        window.location.href = '/'
      }
      return Promise.reject(error);
    }
  );

  return client;
};

if (typeof window !== 'undefined') {
  const userToken = localStorage.getItem('token') || undefined;
  apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/', userToken);
} else {
  apiClient = createApiClient(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/');
}

export default apiClient;
