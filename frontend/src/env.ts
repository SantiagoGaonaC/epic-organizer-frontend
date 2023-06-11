import { createEnv } from "@t3-oss/env-nextjs"; //Autocompletado en las variables de entorno
import { z } from "zod";

export const env = createEnv({
  server: {
    DB_HOST: z.string(),
  },
  client: {
  },
  runtimeEnv: {
    DB_HOST: process.env.DB_HOST, //EJEMPLOS
  },
});
