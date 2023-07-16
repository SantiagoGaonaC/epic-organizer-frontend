import { z } from "zod";

export const registrationSchema = z.object({
  nombre: z
    .string()
    .nonempty("El nombre no puede estar vacío")
    .min(5, { message: "Debe tener 5 caracteres o más" }),
  apellido: z
    .string()
    .nonempty("El apellido no puede estar vacío")
    .min(5, { message: "Debe tener 5 caracteres o más" }),
  email: z.string().email("Email inválido"),
});

export type RegistrationValues = z.infer<typeof registrationSchema>;
