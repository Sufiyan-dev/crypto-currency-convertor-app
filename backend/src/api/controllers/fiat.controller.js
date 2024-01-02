import logger from "../logger/index.js";
import { allFiatSupported } from "../services/fiat.service.js"
import { handleError, handleResponse } from "../utils/responseHelper.js";

async function getAllFiatSupported(req,res){
    try {
        const result = await allFiatSupported();
        logger.debug("result from service "+result.status)
        if(!result.status){
            throw new TypeError(result.message);
        }

        handleResponse({res, statusCode: 200, result: result.message})

    } catch(err){
        logger.error("err controller allfiat "+err.message)
        if(err instanceof TypeError){
            handleError({res, statusCode: 400, result: err.message})
        } else { // internal error
            handleError({res, statusCode: 500, result: err.message})
        }
    }
}

export { getAllFiatSupported }