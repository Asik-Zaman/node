const express = require("express");
const router = express.Router();

// Import the brand router
const brandRouter = require("./routers/brand");
const employeeRouter = require("./routers/employee");
const loginRouter = require("./routers/login");
const categoriesRouter = require("./routers/categories");
router.use("/brand", brandRouter);
router.use("/employee", employeeRouter);
router.use("/userlogin", loginRouter);
router.use("/categories", categoriesRouter);

// Database connection
const { connectionMYSQLGeneral } = require("./connection/connection");
connectionMYSQLGeneral.getConnection((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = router;
