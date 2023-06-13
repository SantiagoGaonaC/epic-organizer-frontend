import Express from "express";
import {
  login,
  generateCode,
  registerUser,
  activateUser,
} from "../controllers/auth";

const router = Express.Router();

router.post("/login/:email", login);
router.post("/login/:email/code", generateCode);
router.post("/register", registerUser);
router.post("/activateuser", activateUser);

export default router;
