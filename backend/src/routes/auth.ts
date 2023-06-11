import Express from "express";
import { login, generateCode } from "../controllers/auth";

const router = Express.Router();

router.post("/login/:email", login)
router.post("/login/:email/code", generateCode)

export default router;