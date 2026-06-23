import type { AxiosError } from "axios";
import type { UserProfileType, UserType } from "./user.types";

export type SigninRequestType = {
  email: string;
  password: string;
};
export type SignupRequestType = {
  name: string;
  email: string;
  password: string;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message: string;
};

export type ApiErrorResponse = {
  response: {
    data: ApiResponse<null>;
  };
};

export type AuthResponseType = {
  user: UserType;
};

export type ApiAxiosError = AxiosError<{ error: string }>;

export type AuthStateType = {
  user: UserType | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: UserType | null) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => Promise<void>;
  getProfile: () => Promise<void>;
  updateProfile: (data: UserProfileType) => Promise<void>;
  signin: (data: SigninRequestType) => Promise<void>;
  signup: (data: SignupRequestType) => Promise<void>;
};
