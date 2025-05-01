require("dotenv").config();

const db = require("../models/queries");

module.exports = {
  getNewCategory: (req, res) => {
    res.render("newCategory", {
      title: "New Matcha Grade",
      error: null,
    });
  },
  getNewItem: async (req, res) => {
    const categories = await db.getCategories();
    res.render("newItem", {
      title: "New Matcha Powder",
      categories: categories,
      error: null,
    });
  },
  addNewCategory: async (req, res) => {
    const secretCode = req.body.secretCode;

    if (secretCode !== process.env.SECRET_CODE) {
      return res.status(403).render("newCategory", {
        title: "New Matcha Grade",
        error: "Invalid secret code. Please try again.",
      });
    }

    await db.addNewCategory(
      req.body.newMatchaCategory,
      req.body.newMatchaCategoryDesc
    );
    res.redirect("/");
  },
  addNewItem: async (req, res) => {
    const secretCode = req.body.secretCode;
    const categories = await db.getCategories();

    if (secretCode !== process.env.SECRET_CODE) {
      return res.status(403).render("newItem", {
        title: "New Matcha Powder",
        categories: categories,
        error: "Invalid secret code. Please try again.",
      });
    }

    await db.addNewItem(
      req.body.selectedCategory,
      req.body.newMatchaName,
      req.body.newMatchaManufacturer,
      req.body.newMatchaPrice * 100
    );
    res.redirect("/");
  },
};
