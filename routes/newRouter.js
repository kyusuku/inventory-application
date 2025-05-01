const { Router } = require("express");
const newRouter = Router();

const newController = require("../controllers/newController");

newRouter.get("/category", newController.getNewCategory);
newRouter.get("/item", newController.getNewItem);
newRouter.post("/category", newController.addNewCategory);
newRouter.post("/item", newController.addNewItem);

module.exports = newRouter;
