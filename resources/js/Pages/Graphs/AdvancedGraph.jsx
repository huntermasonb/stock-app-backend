// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function AdvancedGraphWidget({stock}) {
    const container = useRef();
    console.log(stock)
    useEffect(
        () => {
            const script = document.createElement("script");
            script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
            script.type = "text/javascript";
            script.async = true;
            script.innerHTML = `
        {
          "autosize": true,
          "height": 500,
          "width": "100%",
          "symbol": "${stock}",
          "interval": "D",
          "timezone": "America/New_York",
          "theme": "dark",
          "style": "8",
          "locale": "en",
          "enable_publishing": false,
          "backgroundColor": "rgba(53, 28, 117, 1)",
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "hotlist": true,
          "details": true,
          "calendar": false,
          "support_host": "https://www.tradingview.com"
        }`;
            container.current.appendChild(script);
        },
        []
    );

    return (
        <div className="tradingview-widget-container" ref={container}>
            <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 16px)", width: "100%" }}></div>
            <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span>If you would like to change stocks, please click on current stock and type.</span></a></div>
        </div>
    );
}

export default memo(AdvancedGraphWidget);
