const express = require("express");
const router = express.Router();
const loginModel = require("../models/login");
const bcrypt = require("bcryptjs");
require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
// Login route
router.post("/login", async (req, res) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    return res.status(400).json({
      status: false,
      message: "Please provide phone number and password",
    });
  }

  try {
    // Call the model function for login and get the token
    const token = await loginModel.loginApi(phoneNumber, password);

    // Construct the structured response with status, message, and token directly
    return res.json({
      status: true,
      message: "Login successful",
      token: token, // Directly include the token here
    });
  } catch (error) {
    // Handle any errors
    return res
      .status(error.status)
      .json({ status: false, message: error.message });
  }
});

// registration route
router.post("/registration", async (req, res) => {
  const { name, phoneNumber, password, confPassword, email } = req.body;

  if (!name || !phoneNumber || !password || !confPassword || !email) {
    return res
      .status(400)
      .json({ message: "Please provide phone number and password" });
  }

  try {
    const existingUser = await loginModel.checkUserByPhone(phoneNumber);
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already registered with this phone number",
      });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedConfPassword = hashedPassword;

    // Call the model function to register the user
    await loginModel.registrationApi(
      name,
      phoneNumber,
      hashedPassword,
      hashedConfPassword,
      email
    );

    // Return success message after registration
    return res.status(201).json({
      status: true,
      message: "Registration successful",
    });
  } catch (error) {
    // Handle any errors
    return res
      .status(error.status || 500)
      .json({ status: false, message: error.message || "Registration failed" });
  }
});

router.post("/update-status", async (req, res) => {
  const { username, newStatus } = req.body;

  if (!username || newStatus === undefined) {
    return res
      .status(400)
      .json({ status: false, message: "Username and new status are required" });
  }

  try {
    const existingUser = await loginModel.checkUserByPhone(username);
    if (existingUser) {
      const updateResult = await loginModel.updateUserStatusApi(
        username,
        newStatus
      );
      return res
        .status(200)
        .json({ status: true, message: "Status updated sucessful" });
    } else {
      return res
        .status(200)
        .json({ status: false, message: "Username not found" });
    }
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ status: false, message: error.message });
  }
});

module.exports = router;
