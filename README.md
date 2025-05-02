# Inventory Application

A Node.js and Express application for managing inventory categories and items. This project uses Express for the server, EJS for HTML templating, and PostgreSQL to store data. Users can create categories, add items, and securely delete entries via a secret code.

## Try It Out

Check out the live demo of the application at [here](https://inventory-application-production-68ab.up.railway.app/).

## Features

- **Categories & Items:** Create and manage categories (e.g., matcha grades) and their associated items.
- **Secure Deletions:** Confirm item/category deletion using a secret code in the `.env`.
- **EJS Templating:** Render pages dynamically, passing database data to the client.
- **PostgreSQL Integration:** Store, query, and manipulate data in a PostgreSQL database.

## Project Structure

```
inventory-application
├── app.js                # Main application file
├── package.json          # Project metadata and dependencies
├── models/
│   ├── populatedb.js     # Database setup / seeding script
│   └── ...other models...# Models and database logic
├── routes/
│   └── ...routes here... # Express routes for categories/items
├── views/
│   └── ...ejs templates # EJS views for the application
└── .env.example          # Example environment variable file
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or later)
- [PostgreSQL](https://www.postgresql.org/) installed and running
- A configured `.env` file (see [Environment Variables](#environment-variables))

### Environment Variables

Create a `.env` file in the root directory and add your database credentials and secret code:

```plaintext
DATABASE=my_database
HOST=localhost
USER=my_user
PASSWORD=my_password
PORT=3000
SECRET_CODE=my_secret
```

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/kyusuku/inventory-application.git
   cd inventory-application
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up the Database**  
   Create or populate the database:
   ```bash
   node models/populatedb.js
   ```

### Running the Application

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to access the application.

## Usage

- **Home Page:** View a list of categories and items.
- **Create Items:** Add new items with name, manufacturer, and price.
- **Delete with Secret Code:** Securely remove categories/items by entering the secret code from `.env`.

## Customization

- **Views:** Modify EJS templates in the `views/` folder to change layout or styling.
- **Routes:** Adjust the Express routes in the `routes/` folder for custom logic.
- **Models:** Update the database logic in `models/` if you need different table schemas.

## Acknowledgments

- **The Odin Project:** Offers great full-stack learning resources.
- **Express, EJS & PostgreSQL:** Simple yet powerful tooling for Node.js applications.

## Security

- Keep your `.env` out of source control to protect credentials.
- Use parameterized queries to guard against SQL injection.
- Restrict the secret code to authorized users for deletion.
