const pool = require("./pool");

async function getCategories() {
  try {
    const { rows } = await pool.query(
      "SELECT category, description FROM categories"
    );
    return rows;
  } catch (err) {
    console.error("Error in getCategories: ", err);
    return [];
  }
}

async function getCategoryByName(name) {
  try {
    const { rows } = await pool.query(
      "SELECT category, description FROM categories WHERE category = $1",
      [name]
    );
    return rows;
  } catch (err) {
    console.error("Error in getCategoryByName: ", err);
    return [];
  }
}

async function getAllItems() {
  try {
    const { rows } = await pool.query(
      `SELECT c.category AS category_name,
              i.item,
              i.manufacturer,
              i.price
      FROM inventory AS i
      JOIN categories AS c ON i.category_id = c.id;
      `
    );
    return rows;
  } catch (err) {
    console.error("Error in getAllItems: ", err);
    return [];
  }
}

async function addNewCategory(newMatchaCategory, newMatchaCategoryDesc) {
  try {
    await pool.query(
      "INSERT INTO categories (category, description) VALUES ($1, $2)",
      [capitalize(newMatchaCategory), capitalize(newMatchaCategoryDesc)]
    );
  } catch (err) {
    console.error("Error in addNewCategory: ", err);
    return [];
  }
}

async function addNewItem(
  newMatchaGrade,
  newMatchaName,
  newMatchaManufacturer,
  newMatchaPrice
) {
  try {
    const findCategoryIdQuery = `
      SELECT id
      FROM categories
      WHERE category = $1
    `;
    const { rows } = await pool.query(findCategoryIdQuery, [newMatchaGrade]);
    if (!rows.length) {
      console.error("Category not found: ", newMatchaGrade);
      return [];
    }
    const categoryId = rows[0].id;

    const insertItemQuery = `
      INSERT INTO inventory (category_id, item, manufacturer, price)
      VALUES ($1, $2, $3, $4);
    `;

    await pool.query(insertItemQuery, [
      categoryId,
      capitalize(newMatchaName),
      capitalize(newMatchaManufacturer),
      newMatchaPrice,
    ]);
  } catch (err) {
    console.error("Error in addNewItem: ", err);
    return [];
  }
}

async function getCategoryItems(categoryName) {
  const findCategoryIdQuery = `
      SELECT id
      FROM categories
      WHERE category = $1
    `;
  const { rows } = await pool.query(findCategoryIdQuery, [categoryName]);
  if (!rows.length) {
    return { foundCategory: false, items: [] };
  }
  const categoryId = rows[0].id;

  const { rows: itemRows } = await pool.query(
    `
    SELECT * FROM inventory WHERE category_id = $1;
  `,
    [categoryId]
  );
  return { foundCategory: true, items: itemRows };
}

async function removeItem(itemName) {
  const { rows } = await pool.query(
    "SELECT item FROM inventory WHERE item = $1",
    [capitalize(itemName)]
  );

  if (!rows.length) {
    return { foundItem: false };
  }

  await pool.query("DELETE FROM inventory WHERE item = $1", [
    capitalize(itemName),
  ]);

  return { foundItem: true };
}

async function removeCategory(categoryName) {
  const { rows } = await pool.query(
    `
    SELECT id FROM categories WHERE category = $1
  `,
    [categoryName]
  );
  if (!rows.length) {
    return { foundCategory: false };
  }

  const categoryId = rows[0].id;

  await pool.query("DELETE FROM inventory WHERE category_id = $1", [
    categoryId,
  ]);
  await pool.query("DELETE FROM categories WHERE id = $1", [categoryId]);

  return { foundCategory: true };
}

function capitalize(string) {
  let word = string.toLowerCase();
  return word.charAt(0).toUpperCase() + word.slice(1);
}

module.exports = {
  getCategories,
  getCategoryByName,
  getAllItems,
  addNewCategory,
  addNewItem,
  getCategoryItems,
  removeCategory,
  removeItem,
};
