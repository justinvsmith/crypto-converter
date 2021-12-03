import React from 'react';

export default function ExchangeRate({ExchangedData}) {
    return (
        <div className="exchange-rate">
            <h3>Exchange Rate</h3>
            <h1>{ExchangedData.exchangeRate}</h1>
            <p>{ExchangedData.primaryCurrency} to {ExchangedData.secondaryCurrency}</p>
        </div>
    )
}