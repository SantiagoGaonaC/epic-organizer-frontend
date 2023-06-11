import { Request, Response } from "express";

export const login = (_req: Request, res: Response) => {
    res.send("Hello World");
};

export const generateCode = (_req: Request, res: Response) => {
    res.send("Hello World");
};