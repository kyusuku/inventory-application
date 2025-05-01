const db = require("../models/queries");

function capitalize(string) {
  let word = string.toLowerCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
}

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
  getCategoryItemsPage: async (req, res) => {
    const categoryName = capitalize(req.params.categoryName);
    const { foundCategory, items } = await db.getCategoryItems(categoryName);

    if (!foundCategory) {
      return res.status(404).render("404", {
        message: `Category '${categoryName}' not found`,
      });
    }

    const [category] = await db.getCategoryByName(categoryName);

    res.render("categoryItems", {
      title: categoryName,
      items: items,
      category: category,
    });
  },
};
