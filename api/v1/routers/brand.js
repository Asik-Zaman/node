const express = require("express");
const router = express.Router();
const brandModel = require("../models/brand");
const commonObject = require("../common/common");

// Route to get the brand list
router.get("/brand-list", async (req, res) => {
  try {
    let results = await brandModel.getBrandList();
    return res.status(200).send({
      status: true,
      message: "Brand List",
      count: results.length,
      data: results,
    });
  } catch (error) {
    console.error("Error fetching brand list:", error);
    return res.status(500).send({
      status: false,
      message: "Error fetching brand list",
    });
  }
});

module.exports = router;
