import { axiosInstance } from "@/api/axios";
import {
  type ResetPasswordType,
  type ResetPasswordVerifyOtpType,
  type SigninType,
  type SignupType,
  type VerifyEmailType,
} from "@/lib/schemas/forms/authSchema";

import { ENDPOINTS } from "../endpoints";
import { userAuthSchema } from "@/lib/schemas/apis/authSchema";
import type {
  ApiResponse,
  AuthResponseType,
} from "@/lib/types/auth.types";
import { getErrorMessage } from "@/lib/utils/errorMessage";

async function signin({ email, password }: SigninType) {
  try {
    const response = await axiosInstance.post<ApiResponse<AuthResponseType>>(
      ENDPOINTS.signIn,
      {
        email,
        password,
      },
    );

    const parsed = userAuthSchema.safeParse(response?.data);
    if (!parsed.success) throw new Error("Backend returned invalid user shape");

    return parsed?.data?.data?.user;
  } catch (error: unknown) {
    throw getErrorMessage(error);
  }
}
async function signup(body: SignupType) {
  try {
    const response = await axiosInstance.post<ApiResponse<AuthResponseType>>(
      ENDPOINTS.signUp,
      body,
    );

    const parsed = userAuthSchema.safeParse(response?.data);
    if (!parsed.success) throw new Error("Backend returned invalid user shape");
    return parsed?.data?.data?.user;
  } catch (error: unknown) {
    throw getErrorMessage(error);
  }
}

async function logout() {
  try {
    const response = await axiosInstance.post<ApiResponse<null>>(
      ENDPOINTS.logOut,
    );

    return response;
  } catch (error: unknown) {
    throw getErrorMessage(error);
  }
}

async function verifyEmail({ email }: VerifyEmailType) {
  try {
    const response = await axiosInstance.post<ApiResponse<string>>(
      ENDPOINTS.verifyEmail,
      {
        email,
      },
    );

    return response;
  } catch (error: unknown) {
    throw getErrorMessage(error);
  }
}

async function verifyOTP({ otpCode, email }: ResetPasswordVerifyOtpType) {
  try {
    const response = await axiosInstance.post<ApiResponse<string>>(
      ENDPOINTS.verifyOTP,
      {
        email,
        otpCode,
      },
    );

    return response;
  } catch (error: unknown) {
    throw getErrorMessage(error);
  }
}
async function resetPassword({ email, newPassword }: ResetPasswordType) {
  try {
    const response = await axiosInstance.post<ApiResponse<string>>(
      ENDPOINTS.resetPassword,
      {
        email,
        newPassword,
      },
    );

    return response;
  } catch (error: unknown) {
    throw getErrorMessage(error);
  }
}
async function refreshToken() {
  try {
    const response = await axiosInstance.get<ApiResponse<string>>(
      ENDPOINTS.refreshToken,
    );
    return response;
  } catch (error: unknown) {
    throw getErrorMessage(error);
  }
}

export {
  signin,
  signup,
  logout,
  verifyEmail,
  verifyOTP,
  resetPassword,
  refreshToken,
};
