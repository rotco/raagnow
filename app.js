const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const raagController = require("./controllers/raagController");
const raagRoutes = require("./routes/raagRoutes");
const samayRoutes = require("./routes/samayRoutes");

const app = express();
require("dotenv").config();

const dbURI = process.env.MONGO_CONNECTION;

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("successfully connected to databas");
    app.listen(3000);
  })

  .catch((err) => {
    console.log("err", err);
  });

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use("/raags", raagRoutes);
app.use("/samays", samayRoutes);
app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  res.sendFile("./views/about.html", { root: __dirname });
});
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});
