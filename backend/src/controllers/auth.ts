import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
    res.send("Hello World");
};

export const generateCode = (req: Request, res: Response) => {
    res.send("Hello World");
};