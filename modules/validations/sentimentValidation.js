const Joi = require("joi");

// Schema for sentimentInput
const sentimentInputSchema = Joi.object({
    text : Joi.string().required()
});

module.exports = {
    sentimentInputSchema
};
