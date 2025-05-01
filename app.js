require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const indexRouter = require("./routes/indexRouter");
const newRouter = require("./routes/newRouter");
const deleteRouter = require("./routes/deleteRouter");
app.use("/", indexRouter);
app.use("/new", newRouter);
app.use("/delete", deleteRouter);

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).send("Something broke!");
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}!`);
});
