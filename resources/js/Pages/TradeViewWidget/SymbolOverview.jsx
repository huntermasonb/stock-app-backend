// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function SymbolOverviewWidget({stocks}) {
    const container = useRef();

    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
                {
                    "symbols": [${stocks.map(stock => `["${stock.name}", "${stock.symbol}|1D"]`).join(',')}],
                    "chartOnly": false,
                    "width": "75%",
                    "height": 500,
                    "locale": "en",
                    "colorTheme": "dark",
                    "autosize": false,
                    "showVolume": false,
                    "showMA": false,
                    "hideDateRanges": false,
                    "hideMarketStatus": false,
                    "hideSymbolLogo": false,
                    "scalePosition": "right",
                    "scaleMode": "Normal",
                    "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
                    "fontSize": "10",
                    "noTimeScale": false,
                    "valuesTracking": "1",
                    "changeMode": "price-and-percent",
                    "chartType": "area",
                    "maLineColor": "#2962FF",
                    "maLineWidth": 1,
                    "maLength": 9,
                    "backgroundColor": "rgba(49, 27, 146, 1)",
                    "lineWidth": 2,
                    "lineType": 0,
                    "dateRanges": [
                        "1d|1",
                        "1m|30",
                        "3m|60",
                        "12m|1D",
                        "60m|1W",
                        "all|1M"
                    ]
                }`;
            container.current.appendChild(script);
        },
        [stocks]
    );

    return (
        <div className="tradingview-widget-container mt-10 rounded-md shadow-md hover:shadow-lg shadow-gray-300 hover:shadow-gray-400 dark:shadow-gray-900 dark:hover:shadow-gray-900" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="text-gray-800 hidden">TradingView</span></a></div>
        </div>
    );
}

export default memo(SymbolOverviewWidget);
