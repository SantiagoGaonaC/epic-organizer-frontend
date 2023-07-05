import Express from "express";
import validateRequest from "../middlewares/validateRequest";
import {
  ActivationSchema,
  LoginSchema,
  RegisterSchema,
  CodeParamsSchema,
} from "../schemas/auth";
import { login } from "../controllers/auth/login";
import { generateCode } from "../controllers/auth/generateCode";
import { registerUser } from "../controllers/auth/registerUser";
import { activateUser } from "../controllers/auth/activateUser";

const router = Express.Router();

router.post("/login/:email", validateRequest(LoginSchema), login);
router.post(
  "/login/:email/code",
  validateRequest(CodeParamsSchema),
  generateCode
);
router.post("/register", validateRequest(RegisterSchema), registerUser);
router.post("/activateuser", validateRequest(ActivationSchema), activateUser);

export default router;
