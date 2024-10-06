const fs = require('fs');
const isEmpty = require("is-empty");
const fileUpload = require('express-fileupload');

const path = require("path");
const commonObject = require('./common');
let projectServerJsLocationFolderName =  process.env.project_server_js_location_folder_name;

require('dotenv').config();

// 1 KB  = 1024 BYTE 

let uploadFileFormate = [{
    fileType: "image",
    maxSize: 5 * 1024, //  MB TO KB
    mimetype: ["jpg", "jpeg", "png"],
    fileSavePath: process.env.image
}, {
    fileType: "employeeImage",
    maxSize: 5 * 1024, //  MB TO KB
    mimetype: ["jpg", "jpeg", "png"],
    fileSavePath: process.env.employee_image_path
}, {
    fileType: "file",
    maxSize: 5 * 1024, //  MB TO KB
    mimetype: ["pdf"],
    fileSavePath: process.env.document_file_path
}, {
    fileType: "brandImage",
    maxSize: 5 * 1024, //  MB TO KB
    mimetype: ["jpg", "jpeg", "png"],
    fileSavePath: process.env.brand_image_path
},
{
    fileType: "categoryImage",
    maxSize: 5 * 1024, //  MB TO KB
    mimetype: ["jpg", "jpeg", "png",],
    fileSavePath: process.env.category_image_path
},

{
    fileType: "bannerImg",
    maxSize: 5 * 1024, //  MB TO KB
    mimetype: ["jpg", "jpeg", "png"],
    fileSavePath: process.env.banner_image_path
}, {
    fileType: "announcementImg",
    maxSize: 5 * 1024, //  MB TO KB
    mimetype: ["jpg", "jpeg", "png"],
    fileSavePath: process.env.announcement_image_path
}, {
    fileType: "sellerVisitAttendanceImg",
    maxSize: 5 * 1024, //  MB TO KB
    mimetype: ["jpg", "jpeg", "png"],
    fileSavePath: process.env.seller_visit_attendance_path
}, {
    fileType: "tadaImage",
    maxSize: 5 * 1024, //  MB TO KB
    mimetype: ["jpg", "jpeg", "png"],
    fileSavePath: process.env.tada_image_path
}, {
    fileType: "govPriceFileImgPdf",
    maxSize: 5 * 1024, //  MB TO KB
    mimetype: ["jpg", "jpeg", "png", "pdf"],
    fileSavePath: process.env.gov_price_file_img_pdf_path
}]

let uploadFile = async (req, fileTypeObjectName = "image", inputFieldName = "unknown") => {

    return new Promise(async (resolve, reject) => {

        try {

            // check file is exits or not
            if (isEmpty(req.files) || Object.keys(req.files).length < 1) {
                return resolve({
                    success: false,
                    message: "No files were uploaded."
                });
            }


            // get file condition check and get
            let tempFileFormate;

            for (let index = 0; index < uploadFileFormate.length; index++) {

                if (uploadFileFormate[index].fileType == fileTypeObjectName) {
                    tempFileFormate = uploadFileFormate[index];
                    break;
                }
            }

            if (tempFileFormate === undefined) {
                return resolve({
                    success: false,
                    message: "Unknown file type"
                });
            }

            // check input field name in exit or not 
            // if (!req.files.hasOwnProperty(inputFieldName)) {

            if (Object.keys(req.files).indexOf(inputFieldName) == -1) {
                return resolve({
                    success: false,
                    message: "Unknown request field name"
                });
            }



            // upload file location check, mime type and size
            let directory = __dirname.split(`${projectServerJsLocationFolderName}`);
            let tempMimetype = req.files[inputFieldName].mimetype.split("/");
            tempMimetype = tempMimetype[tempMimetype.length - 1];

            if (tempFileFormate.mimetype.indexOf(tempMimetype) < 0) {
                return resolve({
                    success: false,
                    message: `Invalid file type for ${inputFieldName}. File type should be ${tempFileFormate.mimetype.join(" / ")}`
                });

            } else if (tempFileFormate.maxSize < (req.files[inputFieldName].size / 1024)) {
                return resolve({
                    success: false,
                    message: "File size is too large. Max limit is " + (tempFileFormate.maxSize / 1024) + " MB"
                });
            }


            sampleFile = req.files[inputFieldName];
            // let newFileName = Date.now() + '-' + sampleFile.name;
            let newFileName = Date.now() + '-' + await commonObject.randomStringGenerate(10) + "." + tempMimetype;
            uploadPath = directory[0] + `/${projectServerJsLocationFolderName}/` + tempFileFormate.fileSavePath + newFileName;




            // check folder is exits or not, if not create new folder
            let tempFolderArray = (`${projectServerJsLocationFolderName}/` + tempFileFormate.fileSavePath).split("/");
            let tempDirectoryPath = directory[0] + "/";

            for (let index = 0; index < tempFolderArray.length; index++) {
                tempDirectoryPath += tempFolderArray[index] + "/";

                if (!fs.existsSync(tempDirectoryPath)) {
                    fs.mkdirSync(tempDirectoryPath);
                }
            }

            // move file to upload folder
            sampleFile.mv(uploadPath, async function (err) {
                if (err) {
                    return resolve({
                        success: false,
                        message: err
                    });

                } else {

                    return resolve({
                        success: true,
                        message: "file uploaded successfully",
                        fileName: newFileName,
                        fileOriginalName: sampleFile.name
                    });

                }
            });

        } catch (error) {
            console.log(error)
            return resolve({
                success: false,
                message: "Catch Error",
                error: error
            });
        }
    });
}

let fileRemove = async (fileName = "", fileTypeObjectName = "image") => {


    return new Promise((resolve, reject) => {

        try {

            // get file condition check and get
            let tempFileFormate;

            for (let index = 0; index < uploadFileFormate.length; index++) {

                if (uploadFileFormate[index].fileType == fileTypeObjectName) {
                    tempFileFormate = uploadFileFormate[index];
                    break;
                }
            }

            if (tempFileFormate === undefined) {
                return resolve({
                    success: false,
                    message: "Unknown file type"
                });
            }


            // upload file location check, mime type and size
            let directory = __dirname.split(projectServerJsLocationFolderName);
            let uploadPath = directory[0] + `/${projectServerJsLocationFolderName}/` + tempFileFormate.fileSavePath + fileName;

            // console.log(uploadPath)
            // console.log(fileName)

            fs.chmodSync(directory[0] + `/${projectServerJsLocationFolderName}/` + tempFileFormate.fileSavePath, '0444');
            fs.unlinkSync(uploadPath);

            return resolve({
                success: true,
                message: "file remove successfully done",
                fileName: fileName
            });

        } catch (error) {
            return resolve({
                success: false,
                message: "Catch file not remove.",
                error: error
            });
        }

    });
}



let fileRename = async (existingFileName = "", newFileName = "xcs", fileTypeObjectName = "image") => {


    return new Promise((resolve, reject) => {

        try {

            // get file condition check and get
            let tempFileFormate;

            for (let index = 0; index < uploadFileFormate.length; index++) {

                if (uploadFileFormate[index].fileType == fileTypeObjectName) {
                    tempFileFormate = uploadFileFormate[index];
                    break;
                }
            }

            if (tempFileFormate === undefined) {
                return resolve({
                    success: false,
                    message: "Unknown file type"
                });
            }


            // upload file location check, mime type and size
            let directory = __dirname.split(projectServerJsLocationFolderName);
            let uploadPath = directory[0] + `/${projectServerJsLocationFolderName}/` + tempFileFormate.fileSavePath;



            fs.chmodSync(directory[0] + `/${projectServerJsLocationFolderName}/` + tempFileFormate.fileSavePath, '0444');
            fs.renameSync(uploadPath + existingFileName, uploadPath + newFileName);

            // console.log(uploadPath + existingFileName);

            return resolve({
                success: true,
                message: "file remove successfully done",
                fileName: newFileName
            });

        } catch (error) {
            return resolve({
                success: false,
                message: "Catch file not remove.",
                error: error
            });
        }

    });
}

let fileExitCheck = async (fileName = "", fileTypeObjectName = "image") => {


    return new Promise((resolve, reject) => {

        try {

            // get file condition check and get
            let tempFileFormate;

            for (let index = 0; index < uploadFileFormate.length; index++) {

                if (uploadFileFormate[index].fileType == fileTypeObjectName) {
                    tempFileFormate = uploadFileFormate[index];
                    break;
                }
            }

            if (tempFileFormate === undefined) {
                return resolve({
                    success: false,
                    message: "Unknown file type"
                });
            }

            let directory = __dirname.split(projectServerJsLocationFolderName);
            let uploadPath = directory[0] + `/${projectServerJsLocationFolderName}/` + tempFileFormate.fileSavePath;

            if (fs.existsSync(uploadPath + fileName)) {
                return resolve({
                    success: true,
                    message: "File exists"
                });
            } else {
                return resolve({
                    success: false,
                    message: "File not found"
                });
            }

        } catch (error) {
            return resolve({
                success: false,
                message: "Catch file not remove.",
                error: error
            });
        }

    });
}


module.exports = {
    uploadFile,
    fileRemove,
    fileRename,
    fileExitCheck
}