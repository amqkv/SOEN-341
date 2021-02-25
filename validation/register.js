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
        console.log("name is required")
        errors.name = "Name is required";
    }

    //Validate Email
    if (Validator.isEmpty(data.email)) {
        console.log("email is required")
        errors.email = "Email is required";
    }
    else if (!Validator.isEmail(data.email)) {
        console.log("email isi invalid")
        errors.email = "Email is invalid";
    }

    //Validate Pasword
    if (Validator.isEmpty(data.password)) {
        console.log("pasword is required")
        errors.password = "Password is required";
    }
    if (Validator.isEmpty(data.confirmPassword)) {
        console.log("confirm password is required")
        errors.confirmPassword = "Confirm Password is required";
    }
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        console.log("password must be at least 8 characters")
        errors.password = "Password must be at least 8 characters";
    }
    if (!Validator.equals(data.password, data.confirmPassword)) {
        console.log("password must match")
        errors.confirmPassword = "Passwords must match";
    }
    console.log(errors);
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
