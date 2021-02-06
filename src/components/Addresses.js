import React from 'react'
import { useState, useEffect } from 'react'

const Addresses = () => {

    const [addresses, setAddresses] = useState([]);
    const [nbrOfAddresses, setNbr] = useState(5);
    const [city, setCity] = useState("Helsingborg");


    //http://data.fixer.io/api/latest?access_key=4babd9e1aa4a8bf230ae79e747643be7&symbols=USD,SEK&format=1
    //https://helsingborg.opendatasoft.com/api/records/1.0/search/?dataset=adresser&q=&rows=${nbrOfAddresses}&refine.city=${city}
     const fetchAddresses = async (event) => {
        event.preventDefault();
        console.log("fetchAddresses START")
        let json = "empty"
        const res = await fetch (`http://data.fixer.io/api/latest?access_key=4babd9e1aa4a8bf230ae79e747643be7&symbols=USD,SEK,EUR&format=1`) 
    
        if (res.ok) {
            json = await res.json();
        }

        console.log(json);
    
        console.log(json.base, json.rates.USD, json.rates.SEK);
        const sourceCurrency = json.rates.EUR;
        const targetCurrency = json.rates.SEK;
        //EUR = A*USD = B*SEK
        //SEK = A/B*USD  => exchangeRate = A/B?
        let exchangeRate = targetCurrency/sourceCurrency;
        console.log("1 USD is ", exchangeRate, " SEK");

        return;
    } 

/*     const fetchAddresses = async (event) => {
        event.preventDefault();
         console.log("fetchAddresses START")
        let json = "empty"
        let newAddresses = [];
         const res = await fetch (`http://data.fixer.io/api/latest?access_key=4babd9e1aa4a8bf230ae79e747643be7&symbols=USD,SEK&format=1`) 
    
        if (res.ok) {
            json = await res.json();
        }

        console.log(json);
    
        const records = json["records"];
    
        
        Object.keys(records).forEach(record => {
            const address = records[record]["fields"]["addresslabel"];
            newAddresses.push(address);
        }) 


        console.log("fetchAddress DONE");
        console.log(newAddresses);
        setAddresses(newAddresses);
        
        return;
    }  */

    
    return (
        <div>
            <label>Enter how many addresses you want to list</label><input type="text" name="nbr" value={nbrOfAddresses} onChange={e => setNbr(e.target.value)}/>
            <br></br>
            <label>Enter which city you want to list</label><input type="text" name="city" value={city} onChange={e => setCity(e.target.value)}/>
            <br>
            </br>
            <button onClick={fetchAddresses}>Search</button>

            <h1>FORM CONTAINER BELOW</h1>

            <form onSubmit = {fetchAddresses}>
            {/* <form> */}
                <label>
                    Which city do you want to search in? 
                    <input type="text" name="city"  value={city} onChange={e => setCity(e.target.value)}></input>
                </label>
                <label>
                    How many addresses do you want to list? 
                    <input type="text" name="nbrOfAddresses" value={nbrOfAddresses} onChange={e => setNbr(e.target.value)}></input>
                </label>
                {/* <button onClick={fetchAddresses}>Search</button> */}
                <input type="submit" value="Search" ></input>
           </form>


            <h2>
            {
                addresses.map((address, index) => (
                    (<>{address}{index < addresses.length - 1 && ', '}</>)
                ))
            }
            </h2>

        </div>
    )

}

export default Addresses
