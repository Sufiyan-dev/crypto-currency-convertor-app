import axios from "axios";
import dotenv from "dotenv"
import logger from "../logger/index.js";

dotenv.config()

async function specificCryptoPrice(symbol,amount,inFiat){
    try {
        const res = await axios.get(`https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=${amount}&symbol=${symbol}&convert=${inFiat}`,{headers: {
            'X-CMC_PRO_API_KEY': process.env.CMC_CRYPTO_API
        }})
        logger.debug("api call status "+res.status);

        return { status: true, message: res.data.data}
    } catch(err){
        logger.error("error service cryptoPrice "+err.message)
        return { status: false, message: err.message}
    }
}

export { specificCryptoPrice };