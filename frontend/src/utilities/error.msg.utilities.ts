export const getErrorMessages = (
  noActiveUser: boolean,
  emailCodeIncorrect: boolean,
  errLogin: boolean,
  emailNotFound: boolean
) => {
  return [
    { condition: noActiveUser, message: "Usuario no activo" },
    { condition: emailCodeIncorrect, message: "Email o código incorrecto" },
    { condition: errLogin, message: "Error en el inicio de sesión" },
    { condition: emailNotFound, message: "El email no existe" },
  ];
};
