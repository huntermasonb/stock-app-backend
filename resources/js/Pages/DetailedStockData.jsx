import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import { handleBookmark } from '../Functions.js'

const DetailedStockData = React.memo(function DetailedStockData({ symbol, price }) {
    console.log(symbol);
    const [details, setDetails] = useState({});
    const [isVisible, setIsVisible] = useState(false);

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

    console.log(price);

    let stockClasses = clsx(
        "flex-col",
        "w-1/2",
        {"hidden": !isVisible},
    );
    let buttonClasses = clsx(
        "rounded", "shadow-sm", "hover:shadow-md", "text-indigo-200", "bg-indigo-500",
        "hover:bg-indigo-600", "transition", "duration-250", "ease-in-out", "px-1", "mt-2",
        {"hidden": !isVisible},
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
                onClick={() => handleBookmark(price, details)}
            >
                Bookmark this stock for future reference!
            </button>
        </div>
        </>
    );
});
export default DetailedStockData;
