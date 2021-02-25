const Validator = require("validator");
const isEmpty = require("is-empty");

//vaidateRegisterInput data received from frontEnd
module.exports = function validateAddPostInput(data) {
    let errors = {};

    //Empty fields to empty string in order to use validator functions
    data.image = !isEmpty(data.image) ? data.image : "";

    //Validate image
    if (Validator.isEmpty(data.image)) {
        errors.image = "Please upload an image";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
