import React, { useState } from 'react';
import SymbolOverview from "@/Pages/Graphs/SymbolOverview.jsx";
import AdvancedGraph from "@/Pages/Graphs/AdvancedGraph.jsx";
// import AnalystRating from "@/Pages/Graphs/AnalystRating.jsx";

const GraphsButton = ({stocks, stock}) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(null);

    const handleMenuItemClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
        //setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div className="menu-container flex justify-center items-center">
                <nav className="menu">
                    <input type="checkbox" className="menu-open" name="menu-open" id="menu-open" checked={menuOpen} onChange={() => setMenuOpen(!menuOpen)}/>
                    <label className="menu-open-button bg-indigo-700" htmlFor="menu-open">
                        <div className="sm:hidden">
                            <span className="hamburger hamburger-1 "></span>
                            <span className="hamburger hamburger-2"></span>
                            <span className="hamburger hamburger-3"></span>
                        </div>
                        <div className="hidden sm:block text-sm leading-[80px]">{!menuOpen ? 'Graphs' : 'Close'}</div>
                    </label>

                    {/* Replace anchor tags with React components */}
                    <div className="menu-item shadow-sm shadow-indigo-800 hover:shadow-md">
                    <button onClick={() => handleMenuItemClick('symbolOverview')}>
                            Overview
                        </button>
                    </div>
                  <div className={`menu-item shadow-sm shadow-indigo-800 hover:shadow-md`}>
                        <button onClick={() => handleMenuItemClick('advancedGraph')}>
                            Advanced
                        </button>
                    </div>
                    <div className={`menu-item shadow-sm shadow-indigo-800 hover:shadow-md`}>
                        <button onClick={() => handleMenuItemClick('analystRating')}>
                            Ratings
                        </button>
                    </div>
                </nav>
            </div>

            {selectedMenuItem === 'symbolOverview' && menuOpen && <SymbolOverview stocks={stocks} />}
            {selectedMenuItem === 'advancedGraph' && menuOpen && <AdvancedGraph stock={stock} />}
            {/*{selectedMenuItem === 'analystRating' && menuOpen && <AnalystRating />}*/}
        </>
    );
};

export default GraphsButton;
