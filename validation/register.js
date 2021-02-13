const Validator = require("validator");
const isEmpty = require("is-empty");

//vaidateRegisterInput data received from frontEnd
module.exports = function validateRegisterInput(data) {
    let errors = {};

    //Empty fields to empty string in order to use validator functions
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

    //Validator Name
    if (Validator.isEmpty(data.name)) {
        error.name = "Name is required";
    }

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
    if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = "Confirm Password is required";
    }
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.password = "Password must be at least 8 characters";
    }
    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.confirmPassword = "Passwords must match";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
