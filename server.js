//Gør brug af express
const { request } = require("express");
const express = require("express");
require("dotenv").config();
const cors = require("cors");

//opretter som app
const app = express();

//Mongo
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});
const db = mongoose.connection;
db.on("error", (err) => console.log("fejl" + err));
db.once("open", () => console.log("databasen kører"));

//App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));
app.use(express.static("public"));

//Routes
app.get("/", async (req, res) => {
  console.log("serveren svare");
  return res.status(200).json({ message: "welcome to the server" });
});
//async fordi der er forsinkelse, return er res - resultatet

app.use("/haveservice", require("./Routes/haveservice.route"));

//Listen
app.listen(process.env.PORT),
  () => console.log("server er startet - lytter på port: " + process.env.PORT);
//siger den skal lytte efter den port der er valgt i .env
