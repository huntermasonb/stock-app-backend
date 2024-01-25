import { useState } from "react";
import DetailedStockData from "./DetailedStockData.jsx";

const StockData = ({ symbol, prices }) => {
    const [selectedSymbol, setSelectedSymbol] = useState({});

    //On Click function for the button to fire detailedStockData
    const handleButtonClick = (symbol) => {
        setSelectedSymbol((prevSelectedSymbols) => {
            //Messy way to handle the state of which symbol was clicked. Checks to see if the symbol exists in prevSelectedSymbols, adds it to the array if it doesn't.
            // Should probably re-work this in the future.
            return { ...prevSelectedSymbols, [symbol]: symbol };
        });
    };

    const isButtonHidden = (symbol) => {
        return !!selectedSymbol[symbol]
    }

    // Create an array of arrays, each containing 'itemsPerRow' items and calculate the amount of rows needed based on the number of total symbols
    const itemsPerRow = 3 ;
    const rows = Array.from({ length: Math.ceil(Object.keys(prices).length / itemsPerRow) }, (_, rowIndex) =>
        Object.keys(prices).slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow)
    );

    return (
        <>
        {/*
            Parent Div on StockPrice exists already and class id is 'stockPrices, reason for using an empty JSX parent element'.

            'CARD' FOR DISPLAYING ALL OF THE STOCK INFORMATION
        */}
        <h1 className="mt-6 text-center font-bold text-2xl">
            {symbol.length ? "Stock Prices" : "Enter Symbols to Show Stock Prices. Please Note ETF's detailed information will not work."}
        </h1>
        {/* Card Background */}
        <div className="lg:flex lg:flex-col lg:justify-center">
            {rows.map((row, rowIndex) => (
            <div key={`row-${rowIndex}`} className="grid grid-cols-1 gap-8 mt-8 sm:grid-cols-3">
                {row.map((symbols) => (
                <div
                    key={symbols}
                    id={symbols === "price" ? symbol : symbols}
                    className={`${
                        rowIndex % 2 === 0 ? "bg-indigo-200" : "bg-indigo-300"
                        } p-4 shadow space-y-2 duration-200 transition-all rounded-sm hover:shadow-lg`}
                >
                    {/* Symbol Column */}
                    <div className="flex justify-center" id="symbol">
                        <div className="uppercase font-medium">
                            {symbols === "price" ? symbol : symbols}
                            {/*
                                If price doesn't exist, then there was only one symbol input by the user, changes the way data must be referenced.
                                Checking length of symbols here doesn't help since the data structure is different when there is one vs multiple symbols submitted to the API.

                                I use this way too much throughout this code and need to figure out a way to correct this somehow or create a function I can call.
                            */}
                        </div>
                    </div>

                    {/* Price Column */}
                    <div className="flex justify-center pb-4" id="price">
                        <div className="">
                            {/* If price doesn't exist, then there was only one symbol input by the user. Changes the way data must be referenced from the API */}
                            ${ parseFloat(prices[symbols].price ? (prices[symbols].price): (prices[symbols])).toFixed(2) }
                        </div>
                    </div>
                    {/* Below is very messy and should be reworked. I have nested ternaries to set classes, could potentialy clean this up by using clsx */}
                    <div className="flex flex-col justify-center ">
                        <button className={`${isButtonHidden(symbols === "price" ? symbol : symbols) ? "hidden" : ""} transition-all duration-150 ease-in-out`}
                                onClick={() => handleButtonClick(symbols === "price" ? symbol : symbols)}
                        >
                            More..
                        </button>
                        {selectedSymbol && <DetailedStockData symbol={selectedSymbol[symbols === "price" ? symbol : symbols]} price={parseFloat(prices[symbols].price ? (prices[symbols].price): (prices[symbols])).toFixed(2)} />}
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
