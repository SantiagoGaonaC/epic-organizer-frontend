import { codeAxios } from "./postCode.login.services";
import { handleError } from "@/utilities/handleError.utilities";

export interface IAuthService {
  getCode: (email: string) => Promise<{ ok: boolean; message: string }>;
}

export class AuthServiceAxios implements IAuthService {
  async getCode(email: string): Promise<{ ok: boolean; message: string }> {
    try {
      const response = await codeAxios(email);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  }
}
