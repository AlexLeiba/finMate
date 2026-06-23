import { axiosInstance } from "@/api/axios";
import { ENDPOINTS } from "../endpoints";
import { profileSchema } from "@/lib/schemas/apis/profileSchema";
import type { UserProfileType, UserType } from "@/lib/types/user.types";
import type { ApiResponse } from "@/lib/types/auth.types";

async function getProfile() {
  try {
    const response = await axiosInstance.get<ApiResponse<UserType>>(
      ENDPOINTS.profile,
    );
    const parsed = profileSchema.safeParse(response?.data);

    if (!parsed.success)
      throw new Error("Backend returned invalid profile shape");
    return parsed?.data?.data?.user;
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}
async function updateProfile(profilePayload: UserProfileType) {
  try {
    const response = await axiosInstance.put<ApiResponse<UserType>>(
      ENDPOINTS.profile,
      {
        ...profilePayload,
      },
    );
    const parsed = profileSchema.safeParse(response?.data);

    if (!parsed.success)
      throw new Error("Backend returned invalid profile shape");
    return parsed?.data?.data?.user;
  } catch (error: any) {
    throw error?.message || "Something went wrong";
  }
}

export { getProfile, updateProfile };
