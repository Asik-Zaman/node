const express = require("express");
const router = express.Router();
const isEmpty = require("is-empty");
const categoriesModel = require("../models/categories");
const commonObject = require("../common/common");
const fileUploaderCommonObject = require("../common/fileUploader");
require("dotenv").config();
// get categories data

router.get("/list", async (req, res) => {
  try {
    let results = await categoriesModel.getCatergoryList();
    return res.status(200).send({
      status: true,
      message: "Category List",
      count: results.length,
      imageUrlPath: `${process.env.backend_url}${process.env.category_image_path_name}/`,
      data: results,
    });
  } catch (error) {
    return res.status(500).send({
      status: false,
      message: "Error fetching category list",
    });
  }
});

// Route to add a category with image upload
router.post("/add", async (req, res) => {
  let dateTimeNow = await commonObject.getGMT();

  // Log request body and files
  console.log("Form Data--->>>>>", req.body);
  console.log("Uploaded Files--->>>>>", req.files);

  // Extract form-data
  const { category_name } = req.body;

  // Create request data
  let reqData = {
    category_name: category_name,
    status: 1,
    created_at: dateTimeNow,
    updated_at: dateTimeNow,
    created_by: 1,
    updated_by: 1,
  };

  // Validate required fields
  if (!reqData.category_name) {
    return res.status(400).send({
      success: false,
      status: 400,
      message: "Please give category name",
    });
  }

  // Validate category name length
  let validateName = await commonObject.characterLimitCheck(
    reqData.category_name,
    "Category Name"
  );

  if (validateName.success == false) {
    return res
      .status(400)
      .send({ success: false, status: 400, message: validateName.message });
  }

  reqData.category_name = validateName.data;

  // Check if the category already exists
  let existingData = await categoriesModel.getDataByWhereCondition({
    category_name: reqData.category_name,
    status: [1, 2],
  });

  if (!isEmpty(existingData)) {
    return res.status(409).send({
      success: false,
      status: 409,
      message:
        existingData[0].status == "1"
          ? `${reqData.category_name} already exists.`
          : "Category name exists but is deactivated. You can activate it.",
    });
  }

  // Categoty image functionalities
  if (
    req.files &&
    Object.keys(req.files).length > 0 &&
    req.files.category_image
  ) {
    let fileUploadCode = await fileUploaderCommonObject.uploadFile(
      req,
      "categoryImage",
      "category_image"
    );

    if (fileUploadCode.success == false)
      return res
        .status(200)
        .send({ success: false, status: 400, message: fileUploadCode.message });

    reqData.categori_image = fileUploadCode.fileName;
  } else
    return res.status(400).send({
      success: false,
      status: 400,
      message: "Please give category image",
    });

  let result = await categoriesModel.addNewCategories(reqData);

  if (result.affectedRows == undefined || result.affectedRows < 1)
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Something Wrong in system database.",
    });

  return res.status(201).send({
    success: true,
    status: 201,
    message: "Category Successfully Added.",
  });
});

module.exports = router;
