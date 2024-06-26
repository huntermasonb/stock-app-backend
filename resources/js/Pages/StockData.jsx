import React, { useState } from "react";
import DetailedStockData from "@/Pages/DetailedStockData.jsx";

const StockData = ({ symbol, prices }) => {
    const [selectedSymbol, setSelectedSymbol] = useState({});

    //On Click function for the button to fire detailedStockData
    const handleButtonClick = (symbol) => {
        //Messy way to handle the state of which symbol was clicked. Checks to see if the symbol exists in SelectedSymbols, adds it to the array if it doesn't.
        // Should probably re-work this in the future.
        setSelectedSymbol((prevSelectedSymbols) => {
            return { ...prevSelectedSymbols, [symbol]: symbol };
        });
    };
    const isButtonHidden = (symbol) => {
        return !!selectedSymbol[symbol]
    };

    // Create an array of arrays, each containing 'itemsPerRow' items and calculate the amount of rows needed based on the number of total symbols
    const itemsPerRow = 3 ;
    const rows = Array.from({ length: Math.ceil(Object.keys(prices).length / itemsPerRow) }, (_, rowIndex) =>
        Object.keys(prices).slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow)
    );

    return (
        <>
        {/*
            Parent Div on StockPrice exists already and class id is 'stockPrices
            'CARD' FOR DISPLAYING ALL STOCK INFORMATION
        */}
        <h1 className="mt-6 text-center font-bold text-3xl dark:text-indigo-50 wrap">
            {symbol.length ? "Stock Prices" : "Enter Symbols to Show Stock Prices. Please Note ETF's detailed information will not work."}
        </h1>
        {/* Card Background */}
        <div className="lg:flex lg:flex-col lg:justify-center ">
            {/* Map number of rows based on the total objects calculate above */}
            {rows.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="grid grid-cols-1 gap-8 mt-8 lg:grid-cols-3">

                {/* Map each symbol to its individual card */}
                {row.map((symbols) => (
                <div
                    key={symbols}
                    id={symbols === "price" ? symbol : symbols}
                    //Calculation to determine if the row is even or odd and assign a color to the entire row based on that
                    className={`${
                        rowIndex % 2 === 0 ? "bg-indigo-200" : "bg-indigo-300"
                        } p-4 shadow space-y-2 duration-200 transition-all rounded-lg hover:shadow-lg`
                    }
                >

                    {/* Symbol Column */}
                    <div className="flex justify-center" id="symbol">
                        <div className="uppercase font-medium">
                            {/*
                                If price doesn't exist, then there was only one symbol input by the user, changes the way data must be referenced.
                                Checking length of symbols here doesn't help since the data structure is different when there is one vs multiple symbols submitted to the API.

                                I use the below way too much throughout this code and need to figure out a way to correct this somehow or create a function I can call.
                            */}
                            {symbols === "price" ? symbol : symbols}
                        </div>
                    </div>

                    {/* Price Column */}
                    <div className="flex justify-center pb-4" id="price">
                        <div className="">
                            {/* If price doesn't exist, then there was only one symbol input by the user. Changes the way data must be referenced from the API */}
                            ${ parseFloat(prices[symbols].price ? (prices[symbols].price): (prices[symbols])).toFixed(2) }
                        </div>
                    </div>
                    {/* Below is very messy and should be reworked. I have nested ternaries to set classes, could potentially clean this up by using clsx

                        Display the detailed stock data via the component when button below is clicked.
                    */}
                    <div className="flex flex-col justify-center">
                        <button className={`${isButtonHidden(symbols === "price" ? symbol : symbols) ? "hidden" : ""} transition-all duration-150 ease-in-out`}
                                onClick={() => handleButtonClick(symbols === "price" ? symbol : symbols)}
                        >
                            More..
                        </button>
                        {/* Use the messy ternary to check if symbol exists and pass that data as the key so the suspense trigger functions correctly for  both */}
                        { selectedSymbol[symbols === "price" ? symbol : symbols] && (
                            <DetailedStockData symbol={selectedSymbol[symbols === "price" ? symbol : symbols]}
                                               price={parseFloat(prices[symbols].price ? (prices[symbols].price) : (prices[symbols])).toFixed(2)}
                            />
                        )}
                    </div>
                </div>
                ))}
            </div>
            ))}
        </div>
        {/* END DISPLAY/CARD */}
        </>
    );
};
export default StockData;
