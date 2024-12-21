import { BASE_URL } from '@/utils/apiConstants';
import axios from 'axios';

// Create an axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
});

// Interceptor setup function
export const setupInterceptors = (logout:any) => {
  // Request interceptor
  api.interceptors.request.use(
    (config) => {
      // Add authorization token to requests if available
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle 401 (Unauthorized) status code
      if (error.response && error.response.status === 401) {
        // Clear any stored tokens
        localStorage.removeItem('token');
        
        // Call logout function if provided
        if (logout && typeof logout === 'function') {
          logout();
        }

        // Optionally, redirect to login page
        // This depends on your routing setup
        window.location.href = '/login';
      }
      
      return Promise.reject(error);
    }
  );
};

type CancelApiMethod = {
  handleRequestCancellation: () => {
    signal: AbortSignal;
    cancel: () => void;
  };
};

type CancelApiObject<T> = {
  [K in keyof T]: CancelApiMethod;
};

export const defineCancelApiObject = <T extends object>(apiObject: T): CancelApiObject<T> => {
  const cancelApiObject = {} as CancelApiObject<T>;

  // Iterate through all methods in the API object
  Object.getOwnPropertyNames(apiObject).forEach((apiMethodName) => {
    cancelApiObject[apiMethodName as keyof T] = {
      handleRequestCancellation: () => {
        const controller = new AbortController();
        return {
          signal: controller.signal,
          cancel: () => {
            controller.abort();
          }
        };
      }
    };
  });

  return cancelApiObject;
};