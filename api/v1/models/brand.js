const { connectionMYSQLGeneral } = require("../connection/connection");
const queries = require("../queries/brand");

// Function to get brand list from MySQL
let getBrandList = async () => {
  return new Promise((resolve, reject) => {
    connectionMYSQLGeneral.query(queries.getBrandList(), (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
};

module.exports = {
  getBrandList,
};
