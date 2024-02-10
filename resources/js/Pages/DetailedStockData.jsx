import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import { handleBookmark } from '../Functions.js';

const DetailedStockData = React.memo(function DetailedStockData({ symbol, price }) {
    console.log(symbol);
    //Variables needed to manage state
    const [details, setDetails] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null)

    useEffect(() => {
        if (symbol) {
            setIsVisible(false);
            setDetails({});
            const fetchData = async () => {
                const options = {
                    method: 'GET',
                    url: 'https://alpha-vantage.p.rapidapi.com/query',
                    params: {
                        function: 'OVERVIEW',
                        symbol: symbol,
                        datatype: 'json',
                        output_size: 'compact'
                    },
                    headers: {
                        'X-RapidAPI-Key': '577a69f858msh40fe029fdfb0c7bp1d982cjsna5b05d487d92',
                        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
                    }
                };

                try {
                    const response = await axios.request(options);
                    console.log(response.data);
                    setDetails(response.data);
                    setIsVisible(true);
                } catch (error) {
                    console.error(error);
                    setIsVisible(false);
                    return(error);
                }
            };

            fetchData();
        }
    }, [symbol]);

    let stockClasses = clsx(
        "flex-col",
        "w-1/2",
        {"hidden": !isVisible},
    );
    let buttonClasses = clsx(
        "rounded", "shadow-sm", "hover:shadow-md", "text-indigo-100", "bg-indigo-500",
        "hover:bg-indigo-600", "transition", "duration-250", "ease-in-out", "px-1", "mt-2",
        {"hidden": !isVisible},
    );
    //Response Message classes
    let errorClasses = clsx(
        "flex-row", "justify-center", "mt-3",
        "pt-1", "text-red-600", "text-xl",
        {"hidden": !isMessageVisible || !errorMessage},
    );
    let successClasses = clsx(
        "flex-row", "justify-center", "mt-3",
        "pt-1" ,"text-green-600", "text-xl",
        {"hidden": !isMessageVisible || !successMessage},
    );

    return (
        <>
        <div className="flex flex-row">
            <div className={stockClasses} id="detailedLabels">
                <div>EPS:</div>
                <div>Beta:</div>
                <div>Price to Earnings Ratio:</div>
                <div>Dividend Yield:</div>
                <div>Dividend Date:</div>
                <div>Dividends Per Share:</div>
            </div>
            <div className={stockClasses}>
                <div>{details.EPS}</div>
                <div>{details.Beta}</div>
                <div>{details.PERatio}</div>
                <div>{details.DividendYield}</div>
                <div>{details.DividendDate}</div>
                <div>{details.DividendPerShare}</div>
            </div>
        </div>
        <div className="flex flex-row justify-center">
            <button
                className={buttonClasses}
                onClick={() => handleBookmark(price, details, setErrorMessage, setSuccessMessage, setIsMessageVisible)}
            >
                Bookmark this stock for future reference!
            </button>
        </div>
        <div className={errorClasses}>
            {errorMessage}
        </div>
        <div className={successClasses}>
            {successMessage}
        </div>
        </>
    );
});
export default DetailedStockData;
