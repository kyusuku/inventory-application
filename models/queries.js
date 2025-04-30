const pool = require("./pool");

async function getCategories() {
  try {
    const { rows } = await pool.query(
      "SELECT DISTINCT category FROM inventory"
    );
    return rows;
  } catch (err) {
    console.error("Error in getCategories: ", err);
    return [];
  }
}

async function getAllItems() {
  try {
    const { rows } = await pool.query(
      "SELECT category, item, manufacturer, price FROM inventory"
    );
    return rows;
  } catch (err) {
    console.error("Error in getAllItems: ", err);
    return [];
  }
}

module.exports = {
  getCategories,
  getAllItems,
};
