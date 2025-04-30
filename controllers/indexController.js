const db = require("../models/queries");

module.exports = {
  getIndexPage: async (req, res) => {
    const categories = await db.getCategories();
    res.render("index", {
      title: "Matcha Inventory",
      categories: categories,
    });
  },
  getItemsPage: async (req, res) => {
    const items = await db.getAllItems();
    res.render("allItems", {
      title: "All Matcha Powder",
      items: items,
    });
  },
};
