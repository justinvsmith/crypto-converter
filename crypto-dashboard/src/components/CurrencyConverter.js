import React, { useState } from 'react';
import axios from 'axios';

import ExchangeRate from './ExchangeRate';

require('dotenv').config();

export default function CurrencyConverter () {
    
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA'];
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC');
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC');
    const [amount, setAmount] = useState(1);
    const [result, setResult] = useState(0);

    const [exchangedData, setExchangedData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'BTC',
        exchangeRate: 0
    })

    const convert = () => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/convert',
            params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setResult(response.data * amount);
            setExchangedData({
                primaryCurrency: chosenPrimaryCurrency,
                secondaryCurrency: chosenSecondaryCurrency,
                exchangeRate: response.data
            })
        }).catch(function (error) {
            console.error(error);
        });
    }

    return(
        <div className="currency-converter">
            <h2>Currency Converter</h2>
        <div className="input-box">
        <table>
                <tbody>
                    <tr>
                        <td>Primary Currency:</td>
                        <td>
                            <input 
                                type="number"
                                name="currency-amount-1"
                                value={amount} 
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </td>
                        <td>
                            <select
                                value={chosenPrimaryCurrency}
                                name="currency-option-1"
                                className="currency-options" 
                                onChange={(e) => setChosenPrimaryCurrency(e.target.value)}   
                            >
                                {currencies.map((currency, index) => (<option key={index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Secondary Currency:</td>
                        <td>
                            <input 
                                type="number"
                                name="currency-amount-2"
                                value={result}
                                disable="true" 
                                readOnly={true}
                            />
                        </td>
                        <td>
                            <select
                                value={chosenSecondaryCurrency}
                                name="currency-option-2"
                                className="currency-options"   
                                onChange={(e) => setChosenSecondaryCurrency(e.target.value)} 
                            >
                                {currencies.map((currency, index) => (<option key={index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                </tbody>    
            </table>

            <button id="convert-button" onClick={convert}>Convert</button>
        </div>
            
            <ExchangeRate
                ExchangedData={exchangedData}
            />
        </div>
    )
};