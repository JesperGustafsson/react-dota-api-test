import React, { memo, useState, useEffect, useRef} from 'react'
import styled from 'styled-components';

const ValueSelector = styled.div`
    background-color: #ffffff;
    align-items: center;
    display: flex;
    width: 100%;
`;
const ValueInput = styled.input`
    font-size: 16px;
    border: none;
    width: 88%;
    padding: 0.5em;
    padding-left: 0.75em;

`;

const CurrencySymbol = styled.div`
    background-color: rgba(0, 0, 0, 0.05);
    font-size 16px;
    padding: 0.5em;
    font-weight: 900;
    width: 12%;

`;

const CurrencySelecter = styled.select`
    font-size: 16px;
    padding: 0.5em;
    border: none;
    appearance: button;
    width:100%;
    :hover {
        color: orange;
    }
    margin-bottom: 1em;
`;

const Selector = styled.div`
    font-size: 16px;
    padding: ;
    border-radius: ;
    width: 100%

`;
const CurrencySelector = ( { id, value, currency, currencyTest, setCurrency, setTargetValue, currencyList, currencyData} ) => {
    

    console.log("CurrencySelector >> currencyData: ", currencyData);

    // for (var currency in currencyData) {
    //     console.log("currency(key):: ", currency)
    //     console.log("currency[currencyName]", currencyData[currency]["currencyName"])
    //     console.log("currency[currencySymbol]", currencyData[currency]["currencySymbol"]);

        
    // }


        return (
            <>
            <Selector key ={id+"C"}>
                
                <CurrencySelecter default={currency} key ={id+"CA"} value={currency} onChange={e => setCurrency(e.target.value)} name="currency" id="currency">
               
                        {
                        currencyList.map(((optionCurrency, index) => {
                            return (
                                <option value={optionCurrency}>{currencyData[optionCurrency] ? `${currencyData[optionCurrency]["currencyName"]}  (${optionCurrency})` : "NONC"}</option>);
                        }))
                    } 
          

                </CurrencySelecter>
                <ValueSelector key ={id+"D"}>
                    <ValueInput key ={id+"DA"} value = {value} onChange = {e => {const newValue = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'); setTargetValue(newValue)}} type="text" name="textinputter"/>
                    <CurrencySymbol key ={id+"DB"} >
                        {currencyData[currency] ? currencyData[currency]["currencySymbol"] : "NONC"}
                    </CurrencySymbol>
                </ValueSelector>

                
            </Selector> 
            </>



/*             <>
            <Selector key ={id+"C"}>
                
                <CurrencySelecter default={currency} key ={id+"CA"} value={currency} onChange={e => setCurrency(e.target.value)} name="currency" id="currency">
            
                        {
                        currencyList.map(((optionCurrency, index) => {
                            return (
                                <option value={optionCurrency}>{optionCurrency}</option>);
                        }))
                    } 


                </CurrencySelecter>
                <ValueSelector key ={id+"D"}>
                    <ValueInput key ={id+"DA"} value = {value} onChange = {e => setTargetValue(e.target.value)} type="text" name="textinputter"/>
                    <CurrencySymbol key ={id+"DB"} >
                        {currency}
                    </CurrencySymbol>
                </ValueSelector>

                
            </Selector> 
            </> */
        )

    };

    export default CurrencySelector