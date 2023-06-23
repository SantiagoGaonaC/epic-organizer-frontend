import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Email inválido"),
  code: z
    .string()
    .length(6, "El código debe tener 6 caracteres")
    .refine((check) => {
      let isValid = true;
      for (let i = 0; i < check.length; i++) {
        const char = check[i];
        if (!"0123456789".includes(char as string)) {
          isValid = false;
        }
      }
      return isValid;
    }, "Los caracteres del código solo pueden ser números"),
});

export const CodeSchema = z.object({
  code: z
    .string()
    .length(6, "El código debe tener 6 caracteres")
    .refine((check) => {
      let isValid = true;
      for (let i = 0; i < check.length; i++) {
        const char = check[i];
        if (!"0123456789".includes(char as string)) {
          isValid = false;
        }
      }
      return isValid;
    }, "Los caracteres del código solo pueden ser números"),
});

export const TokenPayloadSchema = z.object({
  sub: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  rol: z.object({
    admin: z.boolean(),
    user: z.boolean(),
  }),
});

export type LoginValues = z.infer<typeof LoginSchema>;
export type CodeValues = z.infer<typeof CodeSchema>;
export type TokenPayload = z.infer<typeof TokenPayloadSchema> | null;
