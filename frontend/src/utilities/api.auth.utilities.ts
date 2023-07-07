import axios, { AxiosInstance } from "axios";
import { env } from "@/env";

export const api: AxiosInstance = axios.create({
  baseURL: `${env.NEXT_PUBLIC_BACKEND_BASE_URL}`,
  withCredentials: true,
});
