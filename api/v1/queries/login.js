let table_name = "userinfo";

// SQL query to get the user by phone number
let getUserByPhoneNumber = (phoneNumber) => {
  return `SELECT * FROM ${table_name} WHERE username = '${phoneNumber}' LIMIT 1`;
};

// SQl query to insert user data in userinfo table
let userRegistration = () => {
  return `INSERT INTO ${table_name} (name, username, password, conf_password, email, status, created_at) VALUES (?,?, ?, ?, ?, 1, NOW())`;
};

// SQl query to insert user data in userinfo table
let userExistingCheck = `SELECT * FROM ${table_name} WHERE username = ?`;


// Update user status in userinfo table
let updateUserStatus = () => {
  return `UPDATE ${table_name} SET status = ? WHERE username = ?`;
};




module.exports = {
  getUserByPhoneNumber,
  userRegistration,
  userExistingCheck,
  updateUserStatus
};
