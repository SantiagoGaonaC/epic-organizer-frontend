import express from "express";
import 'dotenv/config'
import routes from "./routes/index"

const app = express();
app.use(express.json()); //Middleware que transforma o body en JSON

//Todas las routes
app.use("/api", routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});