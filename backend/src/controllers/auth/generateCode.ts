import { Request, Response } from "express";
import sendEmail from "../../helpers/mailer";
import UserModel from "../../models/user";
import { z } from "zod";
import { CodeParamsSchema } from "../../schemas/auth";

export const generateCode = async (req: Request, res: Response) => {
  try {
    // Validar los parámetros de la solicitud
    const params = CodeParamsSchema.parse(req.params);
    const { email } = params;

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
    res.status(200).json({ ok: true, message: "Código enviado con éxito" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).send({ error: error.errors });
    }

    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};
