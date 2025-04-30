const db = require("../models/queries");

module.exports = {
  getNewCategory: (req, res) => {
    res.render("newCategory", {
      title: "New Matcha Grade",
    });
  },
  getNewItem: (req, res) => {
    res.render("newItem", {
      title: "New Matcha Powder",
    });
  },
};
