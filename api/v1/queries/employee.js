let employee_table = "employees";
let employee_salary_table = "employee_salary";
let division_table = "division";
let district_table = "district";
let thana_table = "thana";

// SQL query to get the brand list
let getEmployeeList = () => {
  return `
        SELECT
            e.id AS employee_id,
            e.name AS employee_name,
            e.address AS employee_address,
            e.phone AS employee_phone,
            es.salary_amount AS gross_salary,
            es.is_permanent AS status,
            d.div_name AS division_name,
            di.district_name AS district_name,
            t.thana_name AS thana_name
        FROM ${employee_table} e
        LEFT JOIN ${employee_salary_table} es ON e.id = es.emp_id
        LEFT JOIN ${division_table} d ON e.division = d.id
        LEFT JOIN ${district_table} di ON e.district = di.id
        LEFT JOIN  ${thana_table} t ON e.thana = t.id
        
    `;
};

module.exports = {
  getEmployeeList,
};
