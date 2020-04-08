const Joi = require("@hapi/joi");
const error = require('./error-response');

const createPostLikeValidation = (req, res, next) => {
    const reqBodySchema = Joi.object({
        like: Joi.boolean().required()
    });
    const reqBodyValidation = reqBodySchema.validate(req.body);
    if (reqBodyValidation.error) {
        error(reqBodyValidation.error, res);
    } else {
        next();
    }
}

const updatePostLikeValidation = (req, res, next) => {
    const reqBodySchema = Joi.object({
        like: Joi.boolean().required()
    });
    const reqBodyValidation = reqBodySchema.validate(req.body);
    if (reqBodyValidation.error) {
        error(reqBodyValidation.error, res);
    } else {
        next();
    }
}

module.exports = {
    createPostLikeValidation,
    updatePostLikeValidation
};