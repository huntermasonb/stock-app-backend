import { useState } from 'react';
import { Head } from "@inertiajs/react";
import axios from 'axios';
import StockData from './StockData.jsx';

// MAIN COMPONENT
const StockPrice = () => {
  const [symbols, setSymbols] = useState('');
  const [sortedSymbols, setSortedSymbols] = useState('');
  const [prices, setPrices] = useState([]);

  // Function to handle changes to the stock search bar
  const handleInputChange = (event) => {
    let inputSymbols = event.target.value;
    setSymbols(inputSymbols);

    // Sorting the symbols as the user inputs them since I couldn't figure out how to sort after the data was returned.
    let sortedSymbols = inputSymbols
    .split(/[,\s]+/)
    .filter((symbol) => symbol.length > 1)
    .map((symbol) => symbol.trim())
    .sort()
    .join(',');

    setSortedSymbols(sortedSymbols.trim());
    setPrices({});
    document.getElementById('stockPricesView').style.display="none";
  };

  // Function to trigger the API call and display the fetched data.
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(sortedSymbols);
    fetchData();
    document.getElementById('stockPricesView').style.display="flex";
  };

  // API Request and parameters
  const fetchData = async () => {
    if (symbols) {
      const options = {
        method: 'GET',
        url: 'https://twelve-data1.p.rapidapi.com/price',
        params: {
          symbol: sortedSymbols,
          format: 'json',
          outputsize: '8'
        },
        headers: {
          'X-RapidAPI-Key': '577a69f858msh40fe029fdfb0c7bp1d982cjsna5b05d487d92',
          'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        // console.log(response);
        // Error Handling
        switch (response.status) {
            case 200:
                setPrices(response.data);
                break;
            case 429:
                alert("Error: We have run out of API tokens temporarily, please try again in 1 minute.");
                break;
            case 400:
                alert("Error: There weren't any symbols submitted, please try again.");
                break;
            default:
                alert("Error: An unknown error occurred, please try again. Sorry!");
        }
        // End Error Handling
      }
      catch (error) {
        console.error(error);
      }
    } else {
      alert("An error occurred getting your stocks, please try again.")
    }
  };
  // Search Bar
  return (
      <div className="p-16 w-full">
          <Head title={"Home"}>
              <meta name="description" content="Stock market application for searching, tracking, saving, and monitoring stock data." />
          </Head>
          <div className='flex flex-col w-full'>
              <form onSubmit={handleSubmit} className="flex gap-4 text-center w-full">
                  <input
                      type="text"
                      id="stockSymbols"
                      value={symbols}
                      className="border border-slate-400 px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-slate-400 focus:border-slate-500 focus:outline-none"
                      onChange={handleInputChange}
                      placeholder="AMZN, AAPL..."
                      required
                  />
                  <button
                      type="submit"
                      className="w-1/3 max-w-[250px] px-1 font-semibold rounded shadow-sm transition-colors duration-150 ease-in-out bg-indigo-500 text-indigo-100 hover:bg-indigo-600"
                  >
                    Search
                  </button>
              </form>
              {/* Stock Symbol and Prices Display via StockData.js */}
              <div id='stockPricesView' className='flex flex-col text-center '>
                  <StockData symbol={sortedSymbols} prices={prices} />
              </div>
          </div>
      </div>
  );
};
export default StockPrice;
