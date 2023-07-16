import axios from "axios";
import { env } from "@/env";
import { IRegisterService } from "../models";

export class RegisterServiceAxios implements IRegisterService {
  async register(
    firstname: string,
    lastname: string,
    email: string
  ): Promise<any> {
    try {
      const response = await axios.post(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/register`,
        {
          firstName: firstname,
          lastName: lastname,
          email: email,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
