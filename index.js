import express from "express";
import axios from "axios";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./routes");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { joke: null });
});

app.post("/joke", async (req, res) => {
    const name = req.body.name;
    try {
        const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?contains=${name}`);
        const data = response.data;
        const joke = data.type === "single" ? data.joke : `${data.setup} ${data.delivery}`;
        res.render("index", { joke });
    } catch (err) {
        res.render("index", { joke: "No Jokes here, Sorry!" });
    }
});

app.listen(3000, () => {
    console.log("Server running @ http://localhost:3000");
});