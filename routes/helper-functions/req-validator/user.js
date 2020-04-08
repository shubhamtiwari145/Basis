const Joi = require("@hapi/joi");
const error = require('./error-response');

const userSignUpValidation = (req, res, next) => {
    const reqBodySchema = Joi.object({
        first_name: Joi.string().trim().required(),
        last_name: Joi.string().trim(),
        email: Joi.string().email().trim().required(),
        phone_number: Joi.string().length(10).trim().required(),
        password: Joi.string().trim().required()
    });
    const reqBodyValidation = reqBodySchema.validate(req.body);
    if (reqBodyValidation.error) {
        error(reqBodyValidation.error, res);
    } else {
        next();
    }
}

const userLoginValidation = (req, res, next) => {
    const reqBodySchema = Joi.object({
        phone_number: Joi.string().length(10).trim().required(),
        password: Joi.string().trim().required()
    });
    const reqBodyValidation = reqBodySchema.validate(req.body);
    if (reqBodyValidation.error) {
        error(reqBodyValidation.error, res);
    } else {
        next();
    }
}

const updateUserValidation = (req, res, next) => {
    const reqBodySchema = Joi.object({
        first_name: Joi.string().trim().required(),
        last_name: Joi.string().trim()
    });
    const reqBodyValidation = reqBodySchema.validate(req.body);
    if (reqBodyValidation.error) {
        error(reqBodyValidation.error, res);
    } else {
        next();
    }
}

module.exports = {
    userSignUpValidation,
    userLoginValidation,
    updateUserValidation
};