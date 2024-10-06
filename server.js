const express = require("express");
const app = express();
require('dotenv').config(); 
const fileUpload = require('express-fileupload');
const port = 3000;
app.use(process.env.category_image_path_name, express.static(process.env.category_image_path));
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    defCharset: 'utf8',
    defParamCharset: 'utf8'
}));

// API routes
const api_redirect_path = require("./api/api");
app.use("/api", api_redirect_path);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// Create a MySQL connection
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "my_test",
// });

// // Connect to the database
// connection.connect((err) => {
//   if (err) {
//     console.error("Error connecting to the database:", err.stack);
//     return;
//   }
//   console.log("Connected to the database.");
// });

// POST API to get employees based on status
// app.post("/employees/status", (req, res) => {
//   const status = req.body.status;
//   if (!status) {
//     return res
//       .status(400)
//       .json({ status: false, message: "Status parameter is required" });
//   }

//   // SQL query to fetch data based on the status
//   const query = `
//         SELECT
//             e.id AS employee_id,
//             e.name AS employee_name,
//             e.address AS employee_address,
//             e.phone AS employee_phone,
//             es.salary_amount AS gross_salary,
//             es.is_permanent AS status,
//             d.div_name AS division_name,
//             di.district_name AS district_name,
//             t.thana_name AS thana_name
//         FROM employees e
//         LEFT JOIN employee_salary es ON e.id = es.emp_id
//         LEFT JOIN division d ON e.division = d.id
//         LEFT JOIN district di ON e.district = di.id
//         LEFT JOIN thana t ON e.thana = t.id
//         WHERE es.is_permanent = ?
//     `;

//   // Execute the query with the status parameter
//   connection.query(query, [status], (err, results) => {
//     if (err) {
//       console.error("Error executing query:", err.stack);
//       return res
//         .status(500)
//         .json({ status: false, count: 0, total_salary: 0, data: [] });
//     }

//     // Calculate total salary
//     const total_salary = results.reduce(
//       (acc, curr) => acc + parseFloat(curr.gross_salary || 0),
//       0
//     );

//     // Respond with the results
//     res.json({
//       status: true,
//       count: results.length,
//       total_salary: total_salary,
//       data: results,
//     });
//   });
// });

// Define a route to get employee data
// app.get("/employees", (req, res) => {
//   const query = `
//         SELECT
//             e.id AS employee_id,
//             e.name AS employee_name,
//             e.address AS employee_address,
//             e.phone AS employee_phone,
//             es.salary_amount AS gross_salary,
//             es.is_permanent AS status,
//             d.div_name AS division_name,
//             di.district_name AS district_name,
//             t.thana_name AS thana_name
//         FROM employees e
//         LEFT JOIN employee_salary es ON e.id = es.emp_id
//         LEFT JOIN division d ON e.division = d.id
//         LEFT JOIN district di ON e.district = di.id
//         LEFT JOIN thana t ON e.thana = t.id;
//     `;

//   connection.query(query, (err, results) => {
//     if (err) {
//       console.error("Error executing query:", err.stack);
//       return res
//         .status(500)
//         .json({ status: false, count: 0, total_salary: 0, data: [] });
//     }
//     // Calculate total salary
//     const total_salary = results.reduce(
//       (acc, curr) => acc + parseFloat(curr.gross_salary || 0),
//       0
//     );

//     res.json({
//       status: true,
//       count: results.length,
//       total_salary: total_salary,
//       data: results,
//     });
//   });
// });

// POST API to create brand / update a brand
// app.post("/brand", (req, res) => {
//   const { id, brand_code, brand_name } = req.body;

//   if (!brand_code) {
//     return res.status(400).json({
//       status: false,
//       message: "Brand code parameter is required",
//       brand_id: "required",
//     });
//   } else if (!brand_name) {
//     return res.status(400).json({
//       status: false,
//       message: "Brand name parameter is required",
//       brand_name: "required",
//     });
//   }

//   if (id) {
//     // If ID is provided, update the existing record
//     const updateQuery = `
//         UPDATE brand
//         SET brand_code = ?, brand_name = ?
//         WHERE id = ?
//       `;

//     connection.query(
//       updateQuery,
//       [brand_code, brand_name, id],
//       (err, results) => {
//         if (err) {
//           console.error("Error executing query:", err.stack);
//           return res
//             .status(500)
//             .json({ status: false, message: "Failed to update data" });
//         }

//         if (results.affectedRows === 0) {
//           return res
//             .status(404)
//             .json({ status: false, message: "Brand not found" });
//         }

//         res.json({
//           status: true,
//           message: "Brand updated successfully",
//           brand_id: id,
//         });
//       }
//     );
//   } else {
//     // If ID is not provided, create a new record
//     const insertQuery = `
//         INSERT INTO brand (brand_code, brand_name)
//         VALUES (?, ?)
//       `;

//     connection.query(insertQuery, [brand_code, brand_name], (err, results) => {
//       if (err) {
//         console.error("Error executing query:", err.stack);
//         return res
//           .status(500)
//           .json({ status: false, message: "Failed to insert data" });
//       }

//       res.json({
//         status: true,
//         message: "Brand created successfully",
//         brand_id: results.insertId,
//       });
//     });
//   }
// });

// Define a route to get brand data
// app.get("/brand-list", (req, res) => {
//   const query = `
//         SELECT
//             e.id AS id,
//             e.brand_code AS brand_code,
//             e.brand_name AS brand_name
//         FROM brand AS e
//         `;

//   connection.query(query, (err, results) => {
//     if (err) {
//       console.error("Error executing query:", err.stack);
//       return res
//         .status(500)
//         .json({ status: false, message: "Brand List", count: 0, data: [] });
//     }

//     res.json({
//       status: true,
//       message: "Brand List",
//       count: results.length,
//       data: results,
//     });
//   });
// });

// Define a route to delete a brand by id
// app.delete("/brand-delete", (req, res) => {
//   const { id } = req.body;  // Destructure the id from the request body

//   if (!id) {
//     return res.status(400).json({
//       status: false,
//       message: "Brand ID parameter is required",
//       id: "required",
//     });
//   }

//   const query = `
//        DELETE FROM brand WHERE id = ?
//     `;

//   // Execute the query with the id parameter
//   connection.query(query, [id], (err, results) => {
//     if (err) {
//       console.error("Error executing query:", err.stack);
//       return res
//         .status(500)
//         .json({ status: false, message: "Failed to delete data" });
//     }

//     // Check if any rows were affected
//     if (results.affectedRows === 0) {
//       return res.status(404).json({
//         status: false,
//         message: "Brand not found",
//       });
//     }

//     res.json({
//       status: true,
//       message: "Brand deleted successfully",
//     });
//   });
// });
