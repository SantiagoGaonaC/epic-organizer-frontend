import { Request, Response } from "express";
import UserModel from "../../models/user";
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

    const threeDaysInSeconds = 3 * 24 * 60 * 60; // Calcula la cantidad de segundos en 3 días

    res.cookie("jwt", token, { maxAge: threeDaysInSeconds * 1000 });

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
