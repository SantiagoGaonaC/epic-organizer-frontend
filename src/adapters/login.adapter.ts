//si el endpoint cambia solo modificamos el valor y no el campo campo:valor

export const loginUserAdapter = (email: any) => ({
  ok: email.data.name,
  message: email.data.message,
});
