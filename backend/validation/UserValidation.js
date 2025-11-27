const Joi = require("joi");

// Vslidation for Register

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(2).max(30).required().messages({
      "string.empty": "Please enter your name",
      "string.min": "Name must be at least 2 characters long",
    }),
    email: Joi.string().email().required().messages({
      "string.empty": "Please enter your email",
      "string.email": "Please enter a valid email",
    }),
    password: Joi.string().min(8).required().messages({
      "string.empty": "Please enter your password",
      "string.min": "Password must be at least 8 characters long",
    }),
  });
  return schema.validate(data);
};

// Validation for Login

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
