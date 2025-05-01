require("dotenv").config();

const db = require("../models/queries");

module.exports = {
  removeCategoryWithCode: async (req, res) => {
    const categoryName = req.params.categoryName;
    const { deleteCategoryPassword } = req.body;

    if (deleteCategoryPassword !== process.env.SECRET_CODE) {
      return res.status(403).render("deleteCategory", {
        title: categoryName,
        error: "Invalid secret code. Please try again.",
      });
    }

    const { foundCategory } = await db.removeCategory(categoryName);

    if (!foundCategory) {
      return res
        .status(404)
        .render("404", { message: `Category '${categoryName}' not found` });
    }
    res.redirect("/");
  },
  getDeleteCategoryConfirmation: async (req, res) => {
    const categoryName = req.params.categoryName;
    res.render("deleteCategory", {
      title: categoryName,
      error: null,
    });
  },
  getDeleteItemConfirmation: async (req, res) => {
    const itemName = req.params.itemName;
    res.render("deleteItem", {
      title: itemName,
      error: null,
    });
  },
  removeItemWithCode: async (req, res) => {
    const itemName = req.params.itemName;
    const { deleteItemPassword } = req.body;

    if (deleteItemPassword !== process.env.SECRET_CODE) {
      return res.status(403).render("deleteItem", {
        title: itemName,
        error: "Invalid secret code. Please try again.",
      });
    }

    const { foundItem } = await db.removeItem(itemName);

    if (!foundItem) {
      return res
        .status(404)
        .render("404", { message: `Item '${itemName}' not found` });
    }

    res.redirect("/");
  },
};
