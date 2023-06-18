import { Request, Response } from "express";
import sendEmail from "../helpers/mailer";
import UserModel from "../models/user";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { code } = req.body;

  try {
    const user = await UserModel.findOne({ email, login_code: code });

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    if (!user.activated) {
      return res.status(403).json({ ok: false, message: "User not activated" });
    }

    const tokenPayload = {
      sub: user._id,
      firstname: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.rol,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET as string);

    res.cookie("jwt", token);
    res.status(200).json({
      ok: true,
      data: tokenPayload,
      message: "Logged in successfully!",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Internal Server Error",
      activity: "login",
    });
  }
};

export const generateCode = async (req: Request, res: Response) => {
  const { email } = req.params;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ ok: false, message: "User not found" });
  }
  let randomCode = "";

  for (let index = 0; index <= 5; index++) {
    const random = Math.floor(Math.random() * 10);
    randomCode += random;
  }

  user.login_code = randomCode;
  await user.save();
  sendEmail({
    to: email,
    subject: "Este es tu código: " + randomCode,
    html: "Código para ingresar: " + randomCode,
  });
  res.status(200).json({ ok: true, message: "Código enviado con exito" });
};

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

export const activateUser = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    const user = await UserModel.findOne({ email, login_code: code });
    if (!user) {
      return res.status(404).json({ ok: false, message: "Code not found" });
    }

    if (!user.activated) {
      // Realizar acciones solo si el usuario no está activado previamente
      user.activated = true;
      user.activationExpiresAt = undefined; // Eliminar la fecha de vencimiento
      await user.save();
    }

    res.status(200).json({ ok: true, message: "User activated" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Internal Server Error",
      activity: "activateUser",
    });
  }
};
