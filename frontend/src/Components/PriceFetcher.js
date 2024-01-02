import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './PriceFetcher.css'

const PriceFetcher = () => {
    const [cryptos, setCryptos] = useState([]);
    const [fiats, setFiats] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState("");
    const [selectedFiat, setSelectedFiat] = useState("");
    const [isFetchingPrice, setIsFetchingPrice] = useState(false);

    useEffect(() => {
        console.log('Effect ran');
        const getCryptos = async () => {
            try {
                const result = await axios.get('http://localhost:4000/crypto/all');
                console.log("Result all cryptos ",result.data);
                // updating the state
                setCryptos(result.data.result);
                // setting it to first value
                setSelectedCrypto(result.data.result[0].symbol); 
            } catch(err){
                alert("error when fetching cryptos");
                console.log("err while fetching cryptos ",err.message);
            }
        }

        const getFiats = async () => {
            try {
                const result = await axios.get('http://localhost:4000/fiat/all');
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

    const handleSelectCrypto = (e) => {
        setSelectedCrypto(e.target.value)
    }

    const handleOnClickQuote = (e) => {
        e.preventDefault();
        console.log("quote btn");
        console.log("crypto selected ",selectedCrypto)
    }

  return (
    <div className='priceFetcher'>
        <div></div>
        <form onSubmit={handleOnClickQuote}>
            <label>Crypto : </label><select disabled={isFetchingPrice} value={selectedCrypto} onChange={handleSelectCrypto}>
                {cryptos.length > 0 ? cryptos.map((crypto,i) => (
                    <option key={i}>{crypto.symbol}</option>
                )) : "Fetching"}
            </select>
            <label>Fiat to : </label><select disabled={isFetchingPrice} value={selectedCrypto} onChange={handleSelectCrypto}>
                {cryptos.length > 0 ? 
                cryptos.map((crypto,i) => (
                    <option key={i}>{crypto.symbol}</option>
                )) : (
                    <option disabled>Fetching</option>
                  )}
            </select>
            <button type='submit'>Quote</button>
        </form>
    </div>
  )
}

export default PriceFetcher