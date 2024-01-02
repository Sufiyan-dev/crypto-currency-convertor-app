import logger from "../logger/index.js";
import { specificCryptoPrice } from "../services/price.service.js"
import { handleError, handleResponse } from "../utils/responseHelper.js";
import { validateCryptoPriceQueryInput } from "../validation/priceValidation.js";

async function getPriceOfSpecificCrypto(req,res){
    try {
        const { tokenIn, tokenAmount, priceIn } = req.query;
        console.log(tokenIn, tokenAmount, priceIn)

        const obj = {
            tokenIn,
            tokenAmount,
            priceIn
        }

        const validation = validateCryptoPriceQueryInput(obj);

        if(!validation.status){
            throw new TypeError(validation.message)
        }

        const result = await specificCryptoPrice(tokenIn, tokenAmount, priceIn);

        if(!result.status){
            throw new TypeError(result.message);
        }

        handleResponse({res, statusCode: 200, result: result.message})

    } catch(err){
        logger.error("error controller priceOfCrypto "+err.message)
        if(err instanceof TypeError){
            handleError({res, statusCode: 400, result: err.message})
        } else { // internal error
            handleError({res, statusCode: 500, result: err.message})
        }
    }
}

export { getPriceOfSpecificCrypto }