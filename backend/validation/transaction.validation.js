import Joi from 'joi';

export const transactionSchema = Joi.object({
    title : Joi.string().required(),
    amount : Joi.number().required(),
    type : Joi.string().valid('income', 'expense').required(),
    date : Joi.date().required(),
    category : Joi.string().required(),
    notes : Joi.string().optional().allow(""),
})