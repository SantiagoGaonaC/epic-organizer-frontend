// middlewares/validateRequest.ts

import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export default (schema: z.ZodType<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        ...req.body,
        ...req.params, // Agrega req.params a lo que se valida
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          ok: false,
          message: "Invalid request data",
          errors: error.errors.map((err) => ({
            code: err.code,
            path: err.path,
            message: err.message,
            fatal: err.fatal,
          })),
        });
      } else {
        next(error);
      }
    }
  };
};
