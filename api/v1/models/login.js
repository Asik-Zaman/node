const { connectionMYSQLGeneral } = require("../connection/connection");
const queries = require("../queries/login");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { use } = require("../v1");
require("dotenv").config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);

// Function to handle login
let loginApi = async (phoneNumber, password) => {
  return new Promise((resolve, reject) => {
    // Execute query to get user by phone number
    connectionMYSQLGeneral.query(
      queries.getUserByPhoneNumber(phoneNumber),
      async (error, results) => {
        if (error) return reject({ status: 500, message: "Server error" });

        if (results.length === 0) {
          return reject({ status: 400, message: "Invalid phone number" });
        }

        const user = results[0];
        console.log(user);

        // Compare provided password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return reject({ status: 400, message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
          { id: user.id, phoneNumber: user.username },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );

        return resolve(token);
      }
    );
  });
};

// User status update
let updateUserStatusApi = async (username, newStatus) => {
  return new Promise((resolve, reject) => {
    const query = queries.updateUserStatus(); // Get the update query
    const values = [newStatus, username]; // Set status and username

    connectionMYSQLGeneral.query(query, values, (error, results) => {
      if (error) {
        return reject({ status: 500, message: "Database error" });
      }
     else{
      return resolve(results);
     }
    });
  });
};
// checking if already registered
let checkUserByPhone = async (phoneNumber) => {
  return new Promise((resolve, reject) => {
    const query = queries.userExistingCheck;
    const values = [phoneNumber];
    connectionMYSQLGeneral.query(query, values, (error, results) => {
      console.log(error);
      if (error) {
        return reject({ status: 500, message: "Server error" });
      }
      if (results.length > 0) {
        return resolve(true); // User already exists
      } else {
        return resolve(false); // User does not exist
      }
    });
  });
};

let registrationApi = async (
  name,
  phoneNumber,
  hashedPassword,
  hashedConfPassword,
  email
) => {
  return new Promise((resolve, reject) => {
    const query = queries.userRegistration();
    const values = [name,phoneNumber, hashedPassword, hashedConfPassword, email];

    // Execute the query with placeholders
    connectionMYSQLGeneral.query(query, values, (error, results) => {
      if (error) {
        return reject(error);
      }
      return resolve(results);
    });
  });
};

module.exports = {
  loginApi,
  registrationApi,
  checkUserByPhone,
  updateUserStatusApi,
};
