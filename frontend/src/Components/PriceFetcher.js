import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './PriceFetcher.css'

const PriceFetcher = () => {
    const [cryptos, setCryptos] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const [isFetchingPrice, setIsFetchingPrice] = useState(false);

    useEffect(() => {
        const getCryptos = async () => {
            try {
                const result = await axios.get('http://localhost:4000/crypto/all');
                console.log("Result all cryptos ",result.data);
                // updating the state
                setCryptos(result.data.result);
                // setting it to first value
                setSelectedCrypto(cryptos[0]); 
            } catch(err){
                console.log("err while fetching cryptos ",err.message);
            }
        }
        getCryptos();
    },[]) // on load

    const handleSelectCrypto = (e) => {
        setSelectedCrypto(e.target.value)
    }



  return (
    <div className='priceFetcher'>
        <div></div>
        <form>
            <label>Crypto : </label><select disabled={isFetchingPrice} value={selectedCrypto} onChange={handleSelectCrypto}>
                {cryptos.length > 0 ? cryptos.map((crypto,i) => (
                    <option id={i}>{crypto.symbol}</option>
                )) : "Fetching"}
            </select>
        </form>
    </div>
  )
}

export default PriceFetcher