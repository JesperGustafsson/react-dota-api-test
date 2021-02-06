import React, { memo, useState, useEffect, useRef} from 'react';
import CurrencySelector from './CurrencySelector';
import styled from 'styled-components';



const App = () => {

    // API KEY: 4babd9e1aa4a8bf230ae79e747643be7 fixer.io
    // API KEY: 87b4f9fb2be631bed0c8 currconv


    const [currencyData, setCurrencyData] = useState(["USD", "SEK"])
    const [currencies, setCurrencies] = useState(["USD", "SEK"])
 
    const getCurrencies = async () => {
      console.log("getCurrencies() START");
      const result = await fetch(`https://free.currconv.com/api/v7/currencies?&apiKey=87b4f9fb2be631bed0c8`)
      console.log("result from API", result);
      let json;

      if (result) {
        json = await result.json();
        console.log("JSON from result", json);
      }

      // for (var currency in json.results) {
      //   console.log("currency: ", currency);
      //   let currencySymbol = json.results[currency].currencySymbol;
      //   if (!currencySymbol) currencySymbol = currency;
      //   console.log("symbol: ", currencySymbol);
      //   const currencyName = json.results[currency].currencyName;
      //   console.log("name: ", currencyName);
      // }
      const newCurrencies = Object.keys(json.results);
      console.log("newCurrencies: ", newCurrencies)
      setCurrencyData(json.results);

      setCurrencies(newCurrencies);

    } 

    useEffect(() => {
      getCurrencies();
    }, [])


    useEffect(() => {
      console.log("A USESTATE HAS CHANGED");
    }, )

    const [sourceCurrency, setSourceCurrency] = useState("SEK");
    const [sourceValue, setSourceValue] = useState(100);

    const [targetCurrency, setTargetCurrency] = useState("EUR")
    const [targetValue, setTargetValue] = useState(300);

    const [sourceCurrencyTest, setSourceCurrencyTest] = useState();
    const [targetCurrencyTest, setTargetCurrencyTest] = useState();

    const [exchangeRate, setExchangeRate] = useState(3);


    useEffect(() => {
        
        console.log("CURRENCIES CHANGED: ", sourceCurrency, " >> ", targetCurrency);
        calculateExchange();



    }, [sourceCurrency, targetCurrency])


    const calculateExchange = async () => {
        
       const result = await fetch(`https://free.currconv.com/api/v7/convert?q=${sourceCurrency}_${targetCurrency}&compact=ultra&apiKey=87b4f9fb2be631bed0c8`)
      
       let json;
      if (result) {
        json = await result.json();
   //     alert("Limited amounts of API calls, so don't change currency too often please :)")

        

        const newExchange = (json.[`${sourceCurrency}_${targetCurrency}`])
/*        const sourceExchange = json.rates[sourceCurrency];
          const targetExchange = json.rates[targetCurrency];
          const newExchange = targetExchange/sourceExchange;

          console.log(sourceCurrency, sourceExchange);
          console.log(targetCurrency, targetExchange);
          console.log(targetCurrency, "/", sourceCurrency, ": ", newExchange); */

          setExchangeRate(newExchange);
          setTargetValue(sourceValue*newExchange)
          
      } else {
        console.log("EXCHANGERATE FETCH FAIL");
      }



        console.log("Fetched exchange data...");

        return;

    }

    
    useEffect(() => {
        console.log("targetValue useEffect >> ", targetValue);
    }, [targetValue]) 

    useEffect(() => {
        console.log("sourceValue useEffect >> ", sourceValue);
    }, [sourceValue])



    const updateFromSource = (value) => {
        console.log("UPDATE FROM SOURCE >> ", value)
        setSourceValue(value)
        setTargetValue(value*exchangeRate)
    }

    const updateFromTarget = (value) => {
        console.log("UPDATE FROM TARGET >> ", value)
        setSourceValue(value/exchangeRate)
        setTargetValue(value)
    }

    const swapCurrencies = () => {
      console.log("Swapping currencies")
      const oldSourceCurrency = sourceCurrency;
      const oldTargetCurrency = targetCurrency;
      console.log("Swapping sourceCurrency")
      setSourceCurrency(oldTargetCurrency);
      console.log("Swapping targetCurrency")
      setTargetCurrency(oldSourceCurrency);
      console.log("Swapping DONE")
    }

    return (
        <>
      
        <Container>
          <CurrencySelector  
/*             key = "A" 
 */            id = "B" 
            value={sourceValue} 
            currency={sourceCurrency} 
            currencyTest={sourceCurrencyTest}
            setCurrency={setSourceCurrency}
            setTargetValue={updateFromSource}
            currencyList={currencies}
            currencyData={currencyData}

          />
          <Swapper type="button" onClick={e => swapCurrencies()} value="⇔"/>
          <CurrencySelector  
            /* key = "B" */
            id = "B"
            value={targetValue} 
            currency={targetCurrency} 
            currencyTest={targetCurrencyTest}
            setCurrency={setTargetCurrency} 
            setTargetValue={updateFromTarget} 
            currencyList={currencies}
            currencyData={currencyData}
          />
        </Container>

        <h2>Functionality</h2>
        <p>Currently fetches all currencies at a refresh, meaning if one were to for some reason disappear/appear, it will not be reflected in the list. 
          Could lead to not being able to fetch the exchange rate of the now non-existant currency.
        </p>
        <p>
          Fetches the exchange rate of the two currencies when switching currency via the list.
        </p>
        <p>API calls are limited to 100/hour.</p>
        </>
    )
}

const Swapper = styled.input`
  background-color: #e7e7e7;
  font-size: 35px;
  line-height: 0px;
  height: 31.5px;
  width: 25%;
  border: none;
  :hover {
    color: orange;
    font-weight:900;
  }
`;

const Container = styled.div`
  
  background-color: #e7e7e7;
  padding: 2.5em;
  margin: 2.5em;
  display: flex;
  justify-content: space-between;
  border-radius: 0.3em;
  width: 600px;


`;

export default App


// import logo from './logo.svg';
// import './App.css';
// import Header from './components/Header'
// import PropTypes from 'prop-types';
// import Matches from './components/Matches'
// import {matches} from './database'
// import Addresses from './components/Addresses'

// function App() {





//   return (
//     <div class="container">
//       {/* <Matches matches={matches}/> */}
//       <Addresses />
//       {}
//     </div>
//   );
// }



// export default App;
