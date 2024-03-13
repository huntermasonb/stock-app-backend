import React, { useState } from 'react';
import './css/graphs.css';
import SymbolOverview from "@/Pages/Graphs/SymbolOverview.jsx";
import AdvancedGraph from "@/Pages/Graphs/AdvancedGraph.jsx";
import AnalystRating from "@/Pages/Graphs/AnalystRating.jsx";

const GraphsButton = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
        <div className="menu-container">
            <nav className="menu">
                <input type="checkbox" className="menu-open" name="menu-open" id="menu-open" checked={menuOpen} onChange={() => setMenuOpen(!menuOpen)}/>
                <label className="menu-open-button" htmlFor="menu-open">
                    <span className="hamburger hamburger-1"></span>
                    <span className="hamburger hamburger-2"></span>
                    <span className="hamburger hamburger-3"></span>
                </label>

                {/* Replace anchor tags with React components */}
                <div className={`menu-item ${menuOpen ? 'visible' : 'hidden'}`}>
                    <SymbolOverview />
                </div>
                <div className={`menu-item ${menuOpen ? 'visible' : 'hidden'}`}>
                    <AdvancedGraph />
                </div>
                <div className={`menu-item ${menuOpen ? 'visible' : 'hidden'}`}>
                    <AnalystRating />
                </div>
            </nav>
        </div>
        {/*  SVG Filters  */}
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
                <filter id="shadowed-goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"/>
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/>
                    <feGaussianBlur in="goo" stdDeviation="3" result="shadow"/>
                    <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow"/>
                    <feOffset in="shadow" dx="1" dy="1" result="shadow"/>
                    <feComposite in2="shadow" in="goo" result="goo"/>
                    <feComposite in2="goo" in="SourceGraphic" result="mix"/>
                </filter>
                <filter id="goo">
                    <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"/>
                    <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    <feComposite in2="goo" in="SourceGraphic" result="mix" />
                </filter>
            </defs>
        </svg>
    </>
    );
};

export default GraphsButton;
