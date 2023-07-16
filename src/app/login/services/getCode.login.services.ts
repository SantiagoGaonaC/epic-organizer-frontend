import { AxiosResponse } from "axios";
import { api } from "@/utilities/api.auth.utilities";
export const loginAxios = async (
  email: string,
  code: string
): Promise<AxiosResponse<any>> => {
  try {
    const response = await api.post(
      `/auth/login/${email}`,
      { code },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    throw error;
  }
};
