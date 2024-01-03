import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";


const DetailedStockData = React.memo(function DetailedStockData({ symbol }) {
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
                    return;
                }
            };

            fetchData();
        }
    }, [symbol]);

    var classes = clsx(
        "flex-col",
        "w-1/2",
        {"hidden": !isVisible},
    );

    return (
        <div className="flex flex-row">
            <div className={classes} id="detailedLabels">
                <div>EPS:</div>
                <div>Beta:</div>
                <div>Price to Earnings Ratio:</div>
                <div>Dividend Yield:</div>
                <div>Dividend Date:</div>
                <div>Dividends Per Share:</div>
            </div>
            <div className="flex-col w-1/2">
                <div>{details.EPS}</div>
                <div>{details.Beta}</div>
                <div>{details.PERatio}</div>
                <div>{details.DividendYield}</div>
                <div>{details.DividendDate}</div>
                <div>{details.DividendPerShare}</div>
            </div>    
        </div>
    );
});
export default DetailedStockData;