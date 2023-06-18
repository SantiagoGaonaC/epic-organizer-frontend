// schema/auth.ts

import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6), // número entero de 6 dígitos
});

export const RegisterSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
});

export const ActivationSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6), // número entero de 6 dígitos
});

export const CodeParamsSchema = z.object({
  email: z.string().email(),
});
