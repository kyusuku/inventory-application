const { Router } = require("express");
const newRouter = Router();

const newController = require("../controllers/newController");

newRouter.get("/category", newController.getNewCategory);
newRouter.get("/item", newController.getNewItem);

module.exports = newRouter;
