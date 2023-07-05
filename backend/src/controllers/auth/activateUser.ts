import { Request, Response } from "express";
import UserModel from "../../models/user";

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
