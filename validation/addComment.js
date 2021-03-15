const Validator = require("validator");
const isEmpty = require("is-empty");

//vaidateRegisterInput data received from frontEnd
module.exports = function validateAddCommentInput(data) {
    let errors = {};

    //Empty fields to empty string in order to use validator functions
    data.content = !isEmpty(data.content) ? data.content : "";

    //Validate image
    if (Validator.isEmpty(data.content)) {
        errors.content = "Please insert a comment";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
