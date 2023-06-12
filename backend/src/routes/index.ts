import express from "express";
import authRouter from "./auth";
import calendarRouter from "./calendar";
const router = express.Router();

router.use("/auth", authRouter);
router.use("/calendar", calendarRouter);

export default router;
