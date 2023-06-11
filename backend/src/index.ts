import express from "express";
import 'dotenv/config'
import routes from "./routes/index"
import connectDB from "./db/connect";

const app = express();
app.use(express.json()); //Middleware que transforma o body en JSON


connectDB();
//Todas las routes
app.use("/api", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});