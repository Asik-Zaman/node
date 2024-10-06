

const isEmpty = require("is-empty");
const moment = require("moment");

let isValidPhoneNumberOfBD = async (phoneNumber) => {
  var pattern = /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/;
  result = pattern.test(phoneNumber);

  if (phoneNumber.length != 11) {
    result = false;
  }

  return result;
};

let getGMT = async (dateTime = undefined) => {
  // now gmt is set for bangladesh , check server.js
  let currentGMT = "";
  if (dateTime === undefined) {
    dateTime = new Date();
    // currentGMT = moment().utc().format("YYYY-MM-DD HH:mm:ss");
    currentGMT = moment(dateTime, "YYYY-MM-DD HH:mm:ss").format(
      "YYYY-MM-DD HH:mm:ss"
    );
  } else {
    currentGMT = moment(dateTime, "YYYY-MM-DD HH:mm:ss").format(
      "YYYY-MM-DD HH:mm:ss"
    );
  }
  return currentGMT;
};
let characterLimitCheck = async (value = "", modelField = "", willAllowExtraSpace = false) => {

  let originalValue = value;
  // remove extra space

  value += "";

  if (!willAllowExtraSpace) {
      value = value.replace(/\s+/g, " ");
  }

  if (typeof (value) === "string") value = value.trim();
  // console.log(value.length);

  // unknown space special character remove
  value = value.replace("ㅤ", " ");

  if (isEmpty(value) || value == null || value == undefined) {
      return {
          success: false,
          message: `${modelField} is empty. `,
          data: value,
      };
  }

  let data = [{
      modelField: "Password",
      maxLength: 20,
      minLength: 6,
      isAllowStartWithNumeric: true,
      isAllowStartWithSpecialCharacter: true,
      willItUpperCase: false,
      isAllowSpace: false,
      isMustUserSpecialCharacter: false,
      isMustUserUpperCharacter: false,
      isMustUserLowerCharacter: false,
      isMustUserNumberCharacter: false,
      minimumNumberCharacter: 0,
  },
  {
      modelField: "Name",
      maxLength: 150,
      minLength: 1,
      isAllowStartWithNumeric: true,
      isAllowStartWithSpecialCharacter: true,
      willItUpperCase: false,
      isAllowSpace: true,
      isMustUserSpecialCharacter: false,
      isMustUserUpperCharacter: false,
      isMustUserLowerCharacter: false,
      isMustUserNumberCharacter: false,
      minimumNumberCharacter: 0
  },

  {
      modelField: "First Name",
      maxLength: 150,
      minLength: 1,
      isAllowStartWithNumeric: true,
      isAllowStartWithSpecialCharacter: true,
      willItUpperCase: false,
      isAllowSpace: true,
      isMustUserSpecialCharacter: false,
      isMustUserUpperCharacter: false,
      isMustUserLowerCharacter: false,
      isMustUserNumberCharacter: false,
      minimumNumberCharacter: 0
  },

  {
      modelField: "Master Seller",
      maxLength: 150,
      minLength: 1,
      isAllowStartWithNumeric: true,
      isAllowStartWithSpecialCharacter: true,
      willItUpperCase: false,
      isAllowSpace: true,
      isMustUserSpecialCharacter: false,
      isMustUserUpperCharacter: false,
      isMustUserLowerCharacter: false,
      isMustUserNumberCharacter: false,
      minimumNumberCharacter: 0
  },


  {
      modelField: "Code",
      maxLength: 150,
      minLength: 1,
      isAllowStartWithNumeric: true,
      isAllowStartWithSpecialCharacter: true,
      willItUpperCase: false,
      isAllowSpace: true,
      isMustUserSpecialCharacter: false,
      isMustUserUpperCharacter: false,
      isMustUserLowerCharacter: false,
      isMustUserNumberCharacter: false,
      minimumNumberCharacter: 0
  },

  {
      modelField: "Video Title",
      maxLength: 255,
      minLength: 3,
      isAllowStartWithNumeric: true,
      isAllowStartWithSpecialCharacter: true,
      willItUpperCase: false,
      isAllowSpace: true,
      isMustUserSpecialCharacter: false,
      isMustUserUpperCharacter: false,
      isMustUserLowerCharacter: false,
      isMustUserNumberCharacter: false,
      minimumNumberCharacter: 0
  },

  {
      modelField: "gender",
      maxLength: 20,
      minLength: 1,
      isAllowStartWithNumeric: true,
      isAllowStartWithSpecialCharacter: true,
      willItUpperCase: false,
      isAllowSpace: true,
      isMustUserSpecialCharacter: false,
      isMustUserUpperCharacter: false,
      isMustUserLowerCharacter: false,
      isMustUserNumberCharacter: false,
      minimumNumberCharacter: 0
  },
  {
      modelField: "Category Name",
      maxLength: 255,
      minLength: 2,
      isAllowStartWithNumeric: true,
      isAllowStartWithSpecialCharacter: true,
      willItUpperCase: false,
      isAllowSpace: true,
      isMustUserSpecialCharacter: false,
      isMustUserUpperCharacter: false,
      isMustUserLowerCharacter: false,
      isMustUserNumberCharacter: false,
      minimumNumberCharacter: 0
  },
  {
      modelField: "Brand Code",
      maxLength: 255,
      minLength: 2,
      isAllowStartWithNumeric: true,
      isAllowStartWithSpecialCharacter: true,
      willItUpperCase: false,
      isAllowSpace: true,
      isMustUserSpecialCharacter: false,
      isMustUserUpperCharacter: false,
      isMustUserLowerCharacter: false,
      isMustUserNumberCharacter: false,
      minimumNumberCharacter: 0
  },
  {
      modelField: "Role Name",
      maxLength: 255,
      minLength: 2,
      isAllowStartWithNumeric: false,
      isAllowStartWithSpecialCharacter: false,
      willItUpperCase: false,
      isAllowSpace: true,
      isMustUserSpecialCharacter: false,
      isMustUserUpperCharacter: false,
      isMustUserLowerCharacter: false,
      isMustUserNumberCharacter: false,
      minimumNumberCharacter: 0
  },
  {
      modelField: "Role Title",
      maxLength: 255,
      minLength: 2,
      isAllowStartWithNumeric: false,
      isAllowStartWithSpecialCharacter: false,
      willItUpperCase: false,
      isAllowSpace: true,
      isMustUserSpecialCharacter: false,
      isMustUserUpperCharacter: false,
      isMustUserLowerCharacter: false,
      isMustUserNumberCharacter: false,
      minimumNumberCharacter: 0
  },


  ];

  let index = await data.find(
      (element) => element.modelField.toUpperCase() == modelField.toUpperCase()
  );

  if (index === undefined) {
      return {
          success: false,
          message: `${modelField} is unknown model field. `,
          data: value,
      };
  } else {
      data = index;
  }

  if (data.isAllowSpace === false) {
      if (originalValue.indexOf(" ") > -1) {
          return {
              success: false,
              message: `Space is not allowed in ${data.modelField}. `,
              data: originalValue,
          };
      }
  }

  if (
      value.length < data.minLength ||
      (value.length > data.maxLength && data.maxLength != -1)
  ) {
      return {
          success: false,
          message: data.maxLength == -1 ? `${data.modelField} Length should be at least ${data.minLength} ` : `${data.modelField} Length should be between ${data.minLength} to ${data.maxLength}. `,
          data: originalValue,
      };
  }

  if (data.isAllowStartWithSpecialCharacter == false) {
      if (
          (value.charCodeAt(0) >= 32 && value.charCodeAt(0) <= 47) ||
          (value.charCodeAt(0) >= 58 && value.charCodeAt(0) <= 64) ||
          (value.charCodeAt(0) >= 91 && value.charCodeAt(0) <= 96) ||
          (value.charCodeAt(0) >= 123 && value.charCodeAt(0) <= 126)
      )
          return {
              success: false,
              message: `${data.modelField} never start with special character. `,
              data: originalValue,
          };
  }

  if (data.isAllowStartWithNumeric == false) {
      if (value.charCodeAt(0) >= 48 && value.charCodeAt(0) <= 57) {
          return {
              success: false,
              message: `${data.modelField} never start with number. `,
              data: originalValue,
          };
      }
  }

  if (data.willItUpperCase == true) {
      let tempData = "";

      for (let j = 0; j < value.length; j++) {
          if (
              (value.charCodeAt(j) >= 65 && value.charCodeAt(j) <= 90) ||
              (value.charCodeAt(j) >= 97 && value.charCodeAt(j) <= 122)
          )
              tempData += value[j].toUpperCase();
          else tempData += value[j];
      }

      value = tempData;
  }


  // minimum character type check
  let totalUpperCharacter = 0,
      totalLowerCharacter = 0,
      totalNumberCharacter = 0,
      totalSpecialCharacter = 0;

  for (let i = 0; i < value.length; i++) {
      if (value[i] >= "A" && value[i] <= "Z") totalUpperCharacter++;
      else if (value[i] >= "a" && value[i] <= "z") totalLowerCharacter++;
      else if (value[i] >= "0" && value[i] <= "9") totalNumberCharacter++;
      else totalSpecialCharacter++;
  }


  if (data.isMustUserSpecialCharacter === true && totalSpecialCharacter == 0) {
      return {
          success: false,
          message: `${data.modelField} must have special character. `,
          data: originalValue,
      };
  }


  if (data.isMustUserUpperCharacter === true && totalUpperCharacter == 0) {
      return {
          success: false,
          message: `${data.modelField} must have upper character. `,
          data: originalValue,
      };
  }


  if (data.isMustUserLowerCharacter === true && totalLowerCharacter == 0) {
      return {
          success: false,
          message: `${data.modelField} must have lower character. `,
          data: originalValue,
      };
  }


  if (data.isMustUserNumberCharacter === true && totalNumberCharacter < data.minimumNumberCharacter) {
      return {
          success: false,
          message: `${data.modelField} must have use ${data.minimumNumberCharacter} number character. `,
          data: originalValue,
      };
  }


  return {
      success: true,
      message: "",
      data: value,
  };
};

let randomStringGenerate = async (length = 10) => {
  return new Promise((resolve, reject) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      let randomString = '';
      const charactersLength = characters.length;

      for (let i = 0; i < length; i++) {
          randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      return resolve(randomString);
  });
};

module.exports = {
  isValidPhoneNumberOfBD,
  getGMT,
  characterLimitCheck,
  randomStringGenerate
};
