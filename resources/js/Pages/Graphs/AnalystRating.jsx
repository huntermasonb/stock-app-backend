import React from 'react';
import {PieChart, Pie, Tooltip, Cell, LabelList, Label, Text, ResponsiveContainer} from 'recharts';

/*const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
];*/
const descriptions = (name) => {
    switch (name) {
        case 'Strong Buy':
            return "Analysts strongly recommend purchasing this stock, suggesting that this is a great investment as of the last time you bookmarked this stock."
        case 'Buy':
            return "Analysts recommend purchasing this stock. This would suggest this stock would be a good purchase as of the last time you bookmarked this stock."
        case 'Hold':
            return "Analysts do not recommend purchasing or selling this stock. This suggests the stock could swing either way as of the last time you bookmarked this stock."
        case 'Sell':
            return "Analysts recommend selling this stock. This suggests the stock is on a downward trend as of the last time you bookmarked this stock."
        case 'Strong Sell':
            return "Analysts strongly recommend selling this stock. This suggests the stock is a poor purchase and you should sell it soon as of the last time you bookmarked this stock."
        default:
            return "An error occured"
    }
}
const CustomLabel = ({x, y, name, value}) => {
    if (value > 0) {
        return (
            <text x={x-25} y={y} className="text-sm text-wrap last:-ml-8 fill-indigo-400 dark:fill-indigo-400">{name}</text>
        )
    }
}
const CustomToolTip = ({active, payload}) => {
    if (active && payload && payload.length){
        //Extract the name and value from the payload for variable use
        let {name, value} = payload[0];
        return(
            <div className="flex flex-col p-2 bg-indigo-400 rounded-md">
                <p className="label text-md">{`${name} : ${value}`}</p>
                <p className="desc text-sm">{descriptions(name)}</p>
            </div>
        )
    }
}

const AnalystRating = ({ratings, stockName}) => {
    const data = [
        {name: "Strong Sell", value: ratings.strong_sell},
        {name: "Sell", value:ratings.sell},
        {name: "Hold", value: ratings.hold},
        {name: "Buy", value: ratings.buy},
        {name: "Strong Buy", value: ratings.strong_buy},
    ]
    return (
        <>
            <div className="px-2 text-lg font-semibold text-indigo-900 dark:text-indigo-50">{stockName}</div>
            <div className="flex w-full justify-center">
                <PieChart width={375} height={300}>
                    <Pie
                        animationBegin={200}
                        animationDuration={1500}
                        data={data}
                        dataKey="value"
                        startAngle={180}
                        endAngle={0}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#442CB0"
                        labelLine={false}
                        label={<CustomLabel />}
                    />
                    <Tooltip content={<CustomToolTip />}/>
                </PieChart>
            </div>
        </>
    );
};

export default AnalystRating;
