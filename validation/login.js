const Validator = require("validator");
const isEmpty = require("is-empty");

//vaidateLoginInput data received from frontEnd
module.exports = function validateLoginInput(data) {
    let errors = {};

    //Empty fields to empty string in order to use validator functions
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //Validate Email
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }
    else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    //Validate Pasword
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
