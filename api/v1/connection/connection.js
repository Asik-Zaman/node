const mysql = require("mysql2"); // Use promise-based mysql2 for async/await
require("dotenv").config();

// Create a connection pool instead of a single connection
const connectionPool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "my_test",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = {
  connectionMYSQLGeneral: connectionPool, // Export the pool for use in other modules
};
