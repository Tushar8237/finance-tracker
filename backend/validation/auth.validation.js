import Joi from 'joi';

export const registerSchema = Joi.object({
    username : Joi.string().min(3).max(30).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(6).max(30).required(),
    confirmPassword : Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Passwords do not match'
    })
});

export const loginSchema = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().min(6).max(30).required()
});

