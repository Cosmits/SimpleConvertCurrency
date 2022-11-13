import React from "react";

export default function CurrencyCalculation(props) {
    const {currencyOptions, selectedCurrency, onChangeCurrency, onChangeAmount, amount} = props;
    return (
        <div>
            <input className="input" type="number" onChange={onChangeAmount} value={amount}/>
            <select onChange={onChangeCurrency} value={selectedCurrency}>
                {currencyOptions.map((value, index) => (
                    <option className="input" key={index} value={value}>
                        {value}
                    </option>
                ))}
            </select>
        </div>
    );
}
