import { AxiosResponse } from "axios";
import { api } from "@/utilities/api.auth.utilities";

export const codeAxios = async (email: string): Promise<AxiosResponse<any>> => {
  const response = await api.post(`/auth/login/${email}/code`, {
    withCredentials: true,
  });
  return response;
};
