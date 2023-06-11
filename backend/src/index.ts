import express from "express";

const app = express();
app.use(express.json()); //Middleware que transforma o body en JSON

app.get("/ping", (_req, res) => { //Parametro con _ ignora TS
    console.log("Ping!");
    res.send("pong!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});