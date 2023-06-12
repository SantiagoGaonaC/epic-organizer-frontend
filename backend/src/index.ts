import express from "express";
import "dotenv/config";
import routes from "./routes/index";
import connectDB from "./db/connect";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json()); //Middleware que transforma o body en JSON

connectDB();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
//Todas las routes
app.use("/api", routes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
