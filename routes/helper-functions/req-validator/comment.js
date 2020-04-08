const Joi = require("@hapi/joi");
const error = require('./error-response');

const createCommentValidation = (req, res, next) => {
    const reqBodySchema = Joi.object({
        comment: Joi.string().trim().required()
    });
    const reqBodyValidation = reqBodySchema.validate(req.body);
    if (reqBodyValidation.error) {
        error(reqBodyValidation.error, res);
    } else {
        next();
    }
}

module.exports = {
    createCommentValidation
};