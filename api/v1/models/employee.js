const { connectionMYSQLGeneral } = require("../connection/connection");
const queries = require("../queries/employee");

// Function to get brand list from MySQL
let getEmployeeList = async () => {
  return new Promise((resolve, reject) => {
    connectionMYSQLGeneral.query(queries.getEmployeeList(), (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

module.exports = {
    getEmployeeList,
};
