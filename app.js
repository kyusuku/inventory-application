require("dotenv").config();

const express = require("express");
const app = express();

const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

const indexRouter = require("./routes/indexRouter");
const newRouter = require("./routes/newRouter");
app.use("/", indexRouter);
app.use("/new", newRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express app running on port ${PORT}!`);
});
