import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

var myHeaders = new Headers();
myHeaders.append("apikey", "CI3ZyOUvDJgsgzRENJvoJI13HTr5tjy6");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const Base_URL = 'https://api.apilayer.com/exchangerates_data/latest';

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, settoCurrency] = useState()
  useEffect(()=>{
    fetch(Base_URL,requestOptions)
      .then(res=> res.json())
      .then(data=> {
        const currency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)])
        setFromCurrency(data.base)
        settoCurrency(currency)
      })
      .catch(error=>console.error(error));
  }, [])
  
  return (
    <>
    <h1>Convert</h1>
    <CurrencyRow 
    currencyOptions={currencyOptions} 
    selectedCurrency={fromCurrency}
    onChangeCurrency={e=>setFromCurrency(e.target.value)}
    // changing state using this function . e is event from select
    //https://upmostly.com/tutorials/react-onchange-events-with-examples
    />
    <div className='equals'> = </div>
    <CurrencyRow 
    currencyOptions={currencyOptions}
    selectedCurrency={toCurrency}
    onChangeCurrency={e=> settoCurrency(e.target.value)}
    />
    </>
    
  );
}

export default App;
