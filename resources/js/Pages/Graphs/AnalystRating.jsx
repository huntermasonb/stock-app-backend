import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Legend, Tooltip, Cell } from 'recharts';

/*const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
    { name: 'Group E', value: 278 },
    { name: 'Group F', value: 189 },
];*/

const AnalystRating = ({ratings}) => {
    const data = [
        {name: "Strong Buy", value: ratings.strong_buy},
        {name: "Buy", value: ratings.buy},
        {name: "Hold", value: ratings.hold},
        {name: "Sell", value:ratings.sell},
        {name: "Strong Sell", value: ratings.strong_sell},
    ]
    console.log(data)
    return (
        <PieChart width={300} height={500}>
            <Pie
                data={data}
                dataKey="value"
                startAngle={180}
                endAngle={0}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
            />
        </PieChart>
    );
};

export default AnalystRating;
