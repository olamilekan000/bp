const Joi = require('joi');

const createUserValidator = Joi.object({
  firstName: Joi.string()
    .required()
    .error(new Error('First name is required.')),
  lastName: Joi.string().required().error(new Error('Last name is required.')),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .error(new Error('Email is required.')),
  password: Joi.string().required().error(new Error('Password is required.'))
});

module.exports = createUserValidator;
