import { Request, Response } from "express";
import sendEmail from "../../helpers/mailer";
import UserModel from "../../models/user";
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Verificar si el usuario ya está registrado
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ ok: false, message: "User already exists" });
    }

    let randomCode = "";
    for (let index = 0; index <= 5; index++) {
      const random = Math.floor(Math.random() * 10);
      randomCode += random;
    }

    // Crear un nuevo usuario con los datos proporcionados
    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      login_code: randomCode,
      rol: {
        admin: false,
        user: true,
      },
      activated: false,
    });

    // Enviar un correo electrónico con el código de acceso
    sendEmail({
      to: email,
      subject: "Código de activación: " + randomCode,
      html: "Código para activar la cuenta: " + randomCode,
    });

    res.status(201).json({
      ok: true,
      user: newUser,
      activity: "registerUser",
      status: "Code send to email",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Internal Server Error",
      activity: "registerUser",
    });
  }
};
