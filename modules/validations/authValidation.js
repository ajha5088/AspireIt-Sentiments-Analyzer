const Joi = require("joi");

// Schema for user registration
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%^&+=!]{8,30}$')).required(),
    confirmPassword: Joi.string().required(),
});

// Schema for user login
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = {
    registerSchema,
    loginSchema
};
