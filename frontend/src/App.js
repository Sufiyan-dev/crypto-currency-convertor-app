import './App.css';
import PriceFetcher from './Components/PriceFetcher';

function App() {
  return (
    <div className="App">
      <h1>Crypto Currency Converter</h1>
      <div>
        <PriceFetcher/>
      </div>
    </div>
  );
}

export default App;
