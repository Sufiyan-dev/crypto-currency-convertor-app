import Joi from 'joi';
import logger from '../logger/index.js';

const cryptoPriceQuerySchema = Joi.object({
    tokenIn: Joi.number().positive().required(),
    tokenAmount: Joi.number().positive().required(),
    priceIn: Joi.string().max(3).min(3).required()
})

const validateCryptoPriceQueryInput = (input) => {
    const data = cryptoPriceQuerySchema.validate(input);

    logger.silly('cryptoPriceQuery valdation : ',data);

    if(data.error){
        return { status: !data.error.isJoi, message: data.error.message};
    } else {
        return { status: true, message: 'pass'};
    }
}

export { validateCryptoPriceQueryInput }