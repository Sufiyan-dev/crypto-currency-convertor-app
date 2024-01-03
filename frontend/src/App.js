import './App.css';
import Footer from './Components/Footer';
import PriceFetcher from './Components/PriceFetcher';

function App() {
  return (
    <div className="App">
      <h1 className='h1-wrap'>Crypto Currency Converter</h1>
        <PriceFetcher/>
        <Footer/>
    </div>
  );
}

export default App;
