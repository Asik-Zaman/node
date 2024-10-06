let table_name = "brand";

// SQL query to get the brand list
let getBrandList = () => {
  return `
        SELECT
            e.id AS id,
            e.brand_code AS brand_code,
            e.brand_name AS brand_name
        FROM ${table_name} AS e
    `;
};

module.exports = {
  getBrandList,
};
