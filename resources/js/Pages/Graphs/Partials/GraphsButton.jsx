import React, { useState, Suspense } from 'react';
import SymbolOverview from "@/Pages/Graphs/SymbolOverview.jsx";
import AdvancedGraph from "@/Pages/Graphs/AdvancedGraph.jsx";
import AnalystRating from "@/Pages/Graphs/AnalystRating.jsx";
import Loading from "@/Components/Loading.jsx";


const GraphsButton = ({stocks, stock}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);
    const [selectedStock, setSelectedStock] = useState(null);
    const [ratings, setRatings] = useState(null);
    const [showRatings, setShowRatings] = useState(false);

    // Function to set ratings for the selected stock
    const setStockRatings = (stock) => {
        setSelectedStock(stock);
        setShowRatings(false);
        const newRatings = {
            strong_buy: stock.rating_strong_buy,
            buy: stock.rating_buy,
            hold: stock.rating_hold,
            sell: stock.rating_sell,
            strong_sell: stock.rating_strong_sell,
        };
        setRatings(newRatings);
    };

    return (
        <>
            <div className="menu-container">
                <nav className="menu">
                    <input type="checkbox" className="menu-open" name="menu-open" id="menu-open" checked={menuOpen} onChange={() => {setMenuOpen(!menuOpen); setShowRatings(false)}}/>
                    <label className="menu-open-button bg-indigo-700" htmlFor="menu-open">
                        <div className="sm:hidden">
                            <span className="hamburger hamburger-1 "></span>
                            <span className="hamburger hamburger-2"></span>
                            <span className="hamburger hamburger-3"></span>
                        </div>
                        <div className="hidden sm:block text-sm leading-[80px]">{!menuOpen ? 'Graphs' : 'Close'}</div>
                    </label>

                    <div className="menu-item shadow-sm shadow-indigo-800 hover:shadow-md">
                        <button onClick={() => {setSelectedMenuItem('symbolOverview'); setShowRatings(false)}}>
                            Overview
                        </button>
                    </div>
                    <div className={`menu-item shadow-sm shadow-indigo-800 hover:shadow-md`}>
                        <button onClick={() => {setSelectedMenuItem('advancedGraph'); setShowRatings(false);}}>
                            Advanced
                        </button>
                    </div>
                    <div className={`menu-item shadow-sm shadow-indigo-800 hover:shadow-md`}>
                        <button onClick={() => setShowRatings(!showRatings)}>
                            Ratings
                        </button>

                        <div className="rating-option flex flex-col items-center max-w-fit leading-loose max-h-6">
                            <ul>
                                {showRatings && stocks.map((stockItem, index) => (
                                    <li className=" text-nowrap max-h-6" key={index}>
                                        <button className="text-indigo-950 dark:text-white hover:text-lavender-300" onClick={() => {setStockRatings(stockItem); setSelectedMenuItem('analystRating')}}>
                                            {stockItem.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <Suspense fallback={<Loading width={200} height={300}/>} >
                <div id="graphs-container" className="graphs-container flex flex-col items-center w-full mt-20">
                    {selectedMenuItem === 'symbolOverview' && menuOpen && <SymbolOverview stocks={stocks}/>}
                    {selectedMenuItem === 'advancedGraph' && menuOpen && <AdvancedGraph stock={stock}/>}

                    {selectedMenuItem === 'analystRating' && menuOpen && selectedStock && <AnalystRating ratings={ratings} stockName={selectedStock.name} />}
                </div>
            </Suspense>
        </>
    );
};
export default GraphsButton;
