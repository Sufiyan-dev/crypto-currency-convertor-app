import axios from "axios"
import dotenv from "dotenv"
import logger from "../logger/index.js";

dotenv.config()

async function allCryptoSupported(){
    try {
        const res = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",{headers: {
            'X-CMC_PRO_API_KEY': process.env.CMC_CRYPTO_API
        }})
        logger.debug("api call status "+res.status);

        return { status: true, message: res.data.data}
    } catch(err){
        logger.error("error service allCrypto "+err.message)
        return { status: false, message: err.message}
    }
}

export { allCryptoSupported }