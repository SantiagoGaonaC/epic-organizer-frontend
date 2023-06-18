import Express from "express";
import {
  login,
  generateCode,
  registerUser,
  activateUser,
} from "../controllers/auth";
import validateRequest from "../middlewares/validateRequest";
import {
  ActivationSchema,
  LoginSchema,
  RegisterSchema,
  CodeParamsSchema,
} from "../schemas/auth";

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
