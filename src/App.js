import React, {useEffect, useState} from "react";
import "./App.css";
import CurrencyCalculation from "./CurrencyCalculation";


//                                                         del  "___" from BASE_URL and apikey
const BASE_URL = "https://api.apilayer.com/exchangerates_data/lat___est"
const apikey =                     "10D6WyhN3al2Ix90Gj0Z41sue9NRZ___GAH"

function App() {

    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState(1);
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    let toAmount, fromAmount;

    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRate;
    }

    function requestOptions() {
        const myHeaders = new Headers();
        myHeaders.append("apikey", apikey);

        return {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        }
    }

    useEffect(() => {

        fetch(`${BASE_URL}?symbols=&base=`, requestOptions())
            .then((res) => res.json())
            .then((data) => {
                const firstCurrency = Object.keys(data.rates)[0];
                setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
                setFromCurrency(data.base);
                setToCurrency(firstCurrency);
                setExchangeRate(data.rates[firstCurrency]);
            });
    }, []);

    useEffect(() => {

        if (fromCurrency != null && toCurrency != null) {

            fetch(`${BASE_URL}?symbols=${toCurrency}&base=${fromCurrency}`, requestOptions())
                .then((res) => res.json())
                .then((data) => setExchangeRate(data.rates[toCurrency]));
        }
    }, [fromCurrency, toCurrency]);

    function handleFirstCurrencyChange(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(true);
    }

    function handleSecondCurrencyChange(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(false);
    }

    return (
        <form>
            <h1>-=Currency converter=-</h1>
            <CurrencyCalculation amount={fromAmount} onChangeAmount={handleFirstCurrencyChange}
                                 currencyOptions={currencyOptions}
                                 selectedCurrency={fromCurrency} onChangeCurrency={(e) => setFromCurrency(e.target.value)}/>
            <div className="equals"> = </div>
            <CurrencyCalculation amount={toAmount} onChangeAmount={handleSecondCurrencyChange} currencyOptions={currencyOptions}
                                 selectedCurrency={toCurrency} onChangeCurrency={(e) => setToCurrency(e.target.value)}/>
        </form>
    );
}

export default App;
