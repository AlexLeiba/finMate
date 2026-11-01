import { useAuthStore } from "@/store/useAuthStore";
import { apiFactory } from "../services/apiFactory";
import { axiosInstance } from "./axiosInstance";
import { AUTH_ENDPOINTS } from "../services/endpoints";
import { router } from "@/main";

let isRefreshing = false;// TO AVOID REFRESHING EXPIRED TOKEN FOR MULTIPLE FAILED REQUESTS SIMULTANEOUSLY, WE WILL USE THIS FLAG TO CHECK IF A REFRESH IS ALREADY IN PROGRESS
let failedQueue: any[] = [];

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

    const shouldSkipRefresh = AUTH_ENDPOINTS.some((endpoint) =>
      requestUrl.includes(endpoint),
    );

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
        // call refresh endpoint
        await apiFactory().refreshToken();

        processQueue(null, null);// CLEAN UP QUEUE AFTER SUCCESSFUL REFRESH

        return axiosInstance(originalRequest); // retry original request
      } catch (err) {
        processQueue(err, null);

        useAuthStore.getState().logout(); // LOGOUT USER ON REFRESH FAILURE
        router.invalidate();

        // optional: redirect to login
        // call logout endpoint, to clean token of the user from cookies and DB

        useAuthStore.getState().logout();

        await router.invalidate();

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
