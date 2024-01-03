import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './PriceFetcher.css'
import config from '../config'

const PriceFetcher = () => {
    const baseUrl = config.base_backend_url; 
    
    const [cryptos, setCryptos] = useState([]);
    const [fiats, setFiats] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState("");
    const [selectedFiat, setSelectedFiat] = useState("");
    const [isFetchingPrice, setIsFetchingPrice] = useState(false);
    const [cryptoAmount,setCryptoAmount] = useState(0);
    const [qouteAmount, setQuoteAmount] = useState(0);

    useEffect(() => {
        const getCryptos = async () => {
            try {
                const result = await axios.get(`${baseUrl}crypto/all`);
                console.log("Result all cryptos ",result.data);
                // updating the state
                setCryptos(result.data.result);
                // setting it to first value
                setSelectedCrypto(result.data.result[0].symbol); 
            } catch(err){
                alert("error when fetching cryptos");
                console.log(err)
                console.log("err while fetching cryptos ",err.message);
            }
        }

        const getFiats = async () => {
            try {
                const result = await axios.get(`${baseUrl}fiat/all`);
                console.log("Result all fiats ",result.data);
                // updating the state
                setFiats(result.data.result);
                // setting it to first value
                setSelectedFiat(result.data.result[0].symbol); 
            } catch(err){
                alert("error when fetching fiats");
                console.log("err while fetching cryptos ",err.message);
            }
        }
        getCryptos();
        getFiats();
    },[]) // on load

    useEffect(() => {
        const getPrice = async () => {
            try {
                if(isFetchingPrice){
                    // const symbol = 
                    const result = await axios.get(`${baseUrl}price/crypto?tokenSymbol=${selectedCrypto}&tokenAmount=${cryptoAmount}&priceIn=${selectedFiat}`);
                    console.log(result.data.result[0].quote[selectedFiat].price,(result.data.result[0].quote[selectedFiat].price).toFixed(20));
                    setQuoteAmount((result.data.result[0].quote[selectedFiat].price).toFixed(20));
                }
            } catch(err){
                alert("error when fetching price quote");
                console.log("err while fetching price quote ",err.message);
            }
        }

        getPrice().finally(() => {
            setIsFetchingPrice(false);
        })
    },[isFetchingPrice])

    const handleSelectCrypto = (e) => {
        // console.log(e.target.value)
        setSelectedCrypto(e.target.value)
    }

    const handleSelectFiat = (e) => {
        // console.log(e.target.value)
        setSelectedFiat(e.target.value);
    }

    const handleCryptoAmount = (e) => {
        e.target.value < 0 ? setCryptoAmount(0) : setCryptoAmount(e.target.value)
    }

    const handleOnClickQuote = (e) => {
        e.preventDefault();
        if(cryptoAmount <= 0){
            alert("amount cannot be negative or zero")
        } else {
            console.log("quote btn");
            console.log("crypto selected ",selectedCrypto);
            console.log("crypto amount ",cryptoAmount);
            console.log("fiat selected ",selectedFiat);

            setIsFetchingPrice(true);
        }
    }

  return (
    <div className='priceFetcher card container'>
        <div className='card2 content'>
            <form onSubmit={handleOnClickQuote} className='form-main'>
                <div>
                    <label>Crypto  </label><select className='field2 margin' disabled={isFetchingPrice} value={selectedCrypto} onChange={handleSelectCrypto}>
                        {cryptos.length > 0 ? cryptos.map((crypto,i) => (
                            <option key={i}>{crypto.symbol}</option>
                        )) : (
                            <option disabled>Fetching</option>
                        )}
                    </select>
                </div>
                <div className='crypto-amount-wrapper'>
                    <label>Crypto Amount  </label><div className='field margin'><input className='input-field' placeholder='Amount' type='number' disabled={isFetchingPrice} value={cryptoAmount} onChange={handleCryptoAmount}/></div>
                </div>
                <div>
                    <label>Fiat to  </label><select className='field2 margin' disabled={isFetchingPrice} value={selectedFiat} onChange={handleSelectFiat}>
                        {fiats.length > 0 ? 
                        fiats.map((fiat,i) => (
                            <option key={i}>{fiat.symbol}</option>
                        )) : (
                            <option disabled>Fetching</option>
                        )}
                    </select>
                </div>
                <button type='submit' className='btn'>Quote</button>
                <div>
                    {
                        qouteAmount > 0 ? (
                            <div className='quote-wrapper'>
                                <label>Quote Amount </label><div className='field3 margin'>{qouteAmount}</div>
                            </div>
                        ) : (<div></div>)
                    }
                </div>
            </form>
        </div>
    </div>
  )
}

export default PriceFetcher