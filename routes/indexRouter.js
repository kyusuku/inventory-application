const { Router } = require("express");
const indexRouter = Router();

const indexController = require("../controllers/indexController");
const newRouter = require("./newRouter");

indexRouter.get("/", indexController.getIndexPage);
indexRouter.get("/items", indexController.getItemsPage);
indexRouter.get("/new", newRouter);

module.exports = indexRouter;
