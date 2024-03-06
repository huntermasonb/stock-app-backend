import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import clsx from "clsx";
import { handleBookmark } from '../Functions.js';
import Loading from "@/Components/Loading.jsx";

const DetailedStockData = memo(function DetailedStockData({ symbol, price }) {
    console.log(symbol);
    //Variables needed to manage state
    const [details, setDetails] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //Message variables for letting the user know if their stock was saved
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);


    useEffect(() => {
        if (symbol) {
            setIsVisible(false);
            setErrorMessage(null);setSuccessMessage(null);
            setIsLoading(true);
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
                    setIsLoading(false);
                    setIsVisible(true);
                } catch (error) {
                    console.error(error);
                    if (error.response.status === 429){
                        setErrorMessage("Error: We have temporarily run out of API tokens, please try again in 1 minute.");
                    }
                    setIsVisible(false);
                    setIsMessageVisible(true);
                    return(error);
                }
            };
            fetchData();
        }
    }, [symbol]);

    let stockClasses = clsx(
        "flex", "flex-col", "w-1/2",
        {"hidden": !isVisible},
    );
    let buttonClasses = clsx(
        "rounded", "shadow-sm", "hover:shadow-md", "text-indigo-100", "bg-indigo-500", "hover:bg-indigo-600", "transition", "duration-250", "ease-in-out", "px-1", "mt-2",
        {"hidden": !isVisible},
    );
    //Response Message classes
    let errorClasses = clsx(
       "flex", "flex-row", "justify-center", "mt-3", "pt-1", "text-red-600", "text-xl",
        {"hidden": !isMessageVisible || !errorMessage},
    );
    let successClasses = clsx(
        "flex", "flex-row", "justify-center", "mt-3", "pt-1" ,"text-green-600", "text-xl",
        {"hidden": !isMessageVisible || !successMessage},
    );

    return (
        <>
        {isLoading && !errorMessage &&(
           <Loading />
        )}
        <div className="flex flex-row">
            <div className={stockClasses} id="detailedLabels">
                <div>EPS:</div>
                <div>Beta:</div>
                <div>P/E:</div>
                <div>Dividend Yield:</div>
                <div>Dividend Date:</div>
                <div>Dividends / Share:</div>
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
export default memo(DetailedStockData);
