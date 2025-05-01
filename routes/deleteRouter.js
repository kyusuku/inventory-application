const { Router } = require("express");
const deleteRouter = Router();

const deleteController = require("../controllers/deleteController");

deleteRouter.get(
  "/category/:categoryName",
  deleteController.getDeleteCategoryConfirmation
);
deleteRouter.post(
  "/category/:categoryName",
  deleteController.removeCategoryWithCode
);
deleteRouter.get("/item/:itemName", deleteController.getDeleteItemConfirmation);
deleteRouter.post("/item/:itemName", deleteController.removeItemWithCode);

module.exports = deleteRouter;
