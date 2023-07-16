import { createEnv } from "@t3-oss/env-nextjs"; //Autocompletado en las variables de entorno
import { z } from "zod";

export const env = createEnv({
  server: {
    PUBLIC_BACKEND_BASE_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_BACKEND_BASE_URL: z.string(),
  },
  runtimeEnv: {
    PUBLIC_BACKEND_BASE_URL: process.env.PUBLIC_BACKEND_BASE_URL,
    NEXT_PUBLIC_BACKEND_BASE_URL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL
  },
});
