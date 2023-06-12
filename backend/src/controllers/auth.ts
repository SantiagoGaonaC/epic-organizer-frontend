import { Request, Response } from "express";
import sendEmail from "../helpers/mailer";
import UserModel from "../models/user";

export const login = async (req: Request, res: Response) => {
    const {email} = req.params;
    const {code} = req.body;
    const user = await UserModel.findOne({email, login_code: code});
    if (!user) {
        return res.status(404).json({ok: false,message: "Code not found"})
    }
    res.status(200).json({ok: true,message: "Code found!"})
};

export const generateCode = async (req: Request, res: Response) => {
    const {email} = req.params;
    const user = await UserModel.findOne({email});
    if (!user) {
        return res.status(404).json({ok: false,message: "User not found"})
    }
    let randomCode = ""

    for (let index = 0; index <= 5; index++) {
        const random = Math.floor(Math.random() * 10)
        randomCode += random
    }

    user.login_code = randomCode
    await user.save()
    sendEmail({
        to: email,
        subject: "Este es tu código: " + randomCode,
        html: "Código para ingresar: " + randomCode,
    })
    res.send("SEND CODE ROUTE");
};