// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function SymbolOverviewWidget({stocks}) {
    const container = useRef();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = `
            {
                "symbols": [${stocks.map(stock => `["${stock.name}", "${stock.symbol}|1D"]`).join(',')}],
                "chartOnly": false,
                "width": "100%",
                "height": 500,
                "locale": "en",
                "colorTheme": "dark",
                "autosize": true,
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
                "maLineColor": "#ffffff",
                "maLineWidth": 1,
                "maLength": 18,
                "backgroundColor": "#311b92",
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
        // Inject CSS to remove the border associated with 'tv-widget-chart--with-border'
        const iframe = container.current.querySelector('iframe');
        if (iframe) {
            iframe.onload = () => {
                const css = `
                    .tv-widget-chart--with-border {
                        border: none !important;
                    }
                `;
                const style = iframe.contentDocument.createElement('style');
                style.innerHTML = css;
                iframe.contentDocument.head.appendChild(style);
            };
        }
    },[stocks]);
    return (
        <div className="tradingview-widget-container mt-10 rounded-2xl shadow-sm shadow-gray-400 hover:shadow-gray-500 dark:shadow-gray-900 dark:hover:shadow-gray-900 transition duration-150 ease-in-out sm:px-6 lg:px-8" ref={container}>
            <div className="tradingview-widget-container__widget"></div>
        </div>
    );
}

export default memo(SymbolOverviewWidget);
