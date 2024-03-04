import axios from "axios";

// COMBINE API DATA TO BE PASSED TO LARAVEL
const combineAPIData = (price, details) => {
    const stockPrice = price;
    const stockDetails = details;

    return {
        name: stockDetails.Name,
        symbol: stockDetails.Symbol,
        price: parseFloat(stockPrice).toFixed(2),
        beta: parseFloat(stockDetails.Beta).toFixed(3),
        EPS: Number(stockDetails.EPS).toFixed(2),
        price_to_earnings: parseFloat(stockDetails.PERatio).toFixed(3),
        dividend_yield: stockDetails.DividendYield,
        dividend_date: stockDetails.DividendDate,
        dividend_per_share: stockDetails.DividendPerShare,
    };
};

//CALL THE FUNCTION TO COMBINE API DATA AND BEGIN THE PROCESS OF STORING IT IN THE DATABASE
export const handleBookmark = async (price, details, setErrorMessage, setSuccessMessage, setIsMessageVisible) => {
    const Price = price;
    const Details = details;
    setErrorMessage(null);
    setIsMessageVisible(null);

    //Call the function to combine the data together
    const combinedData = combineAPIData(Price, Details);

    //Send combinedData to laravel via axios request and a route created in /routes/web.php.
    try {
        const response = await axios.post('/saveData', combinedData);

        //200 response means the request was successful
        if (response.status === 200) {
            //Redirect and/or success message goes here
            setSuccessMessage("Successfully bookmarked stock! Navigate to your dashboard to view.")
            setIsMessageVisible(true);
        }
    } catch (error) {
        console.error('Error bookmarking stock:', error);
        //User isn't logged in to an account so unauthorized to save
        if (error.response.status === 401 ){
            setErrorMessage("Failed to bookmark stock: You are not authorized to do this, please log in to your account.");
            setIsMessageVisible(true);
        }
        //Missing piece of information that is required for stock data
        else if (error.response.status === 422 ){
            setErrorMessage("Failed to bookmark stock: There was at least one required piece of data missing.");
            setIsMessageVisible(true);
        }
    }
};
