import { axiosInstance } from "./axiosInstance";
import { AUTH_ENDPOINTS, ENDPOINTS } from "../services/endpoints";

let isRefreshing = false; // TO AVOID REFRESHING EXPIRED TOKEN FOR MULTIPLE FAILED REQUESTS SIMULTANEOUSLY, WE WILL USE THIS FLAG TO CHECK IF A REFRESH IS ALREADY IN PROGRESS
let failedQueue: any[] = [];
let handleAuthFailure: (() => void | Promise<void>) | undefined;

export function setAuthFailureHandler(handler: () => void | Promise<void>) {
  handleAuthFailure = handler;
}

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url ?? "";

    const shouldSkipRefresh = AUTH_ENDPOINTS.some((endpoint) => requestUrl.includes(endpoint));

    if (shouldSkipRefresh) {
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await axiosInstance.get(ENDPOINTS.refreshToken);

        processQueue(null, null); // CLEAN UP QUEUE AFTER SUCCESSFUL REFRESH

        return axiosInstance(originalRequest); // retry original request
      } catch (err) {
        processQueue(err, null);

        await handleAuthFailure?.();

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
