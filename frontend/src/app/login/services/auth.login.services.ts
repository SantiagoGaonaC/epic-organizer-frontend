import { codeAxios } from "./postCode.login.services";
import { handleError } from "@/utilities/handleError.utilities";
import { IAuthService } from "../models";

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
