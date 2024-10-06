const express = require("express");
const router = express.Router();

// Load version 1 routes
const api_v1 = require("./v1/v1");
router.use("/v1", api_v1);

router.get("/v1/*", (req, res) => {
  return res.status(400).send({
    status: 400,
    message: "Unknown route",
    success: true,
  });
});

router.get("/*", (req, res) => {
  return res.status(400).send({
    status: 400,
    message: "Please select API version",
    success: true,
  });
});

module.exports = router;
