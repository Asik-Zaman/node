const express = require("express");
const router = express.Router();
const empModel = require("../models/employee");

// Route to get the brand list
router.get("/employee-list", async (req, res) => {
  try {
    let results = await empModel.getEmployeeList();
    return res.status(200).send({
      status: true,
      message: "Employee List",
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Error fetching Employee list:", error);
    return res.status(500).send({
      status: false,
      message: "Error fetching Employee list",
    });
  }
});

module.exports = router;
