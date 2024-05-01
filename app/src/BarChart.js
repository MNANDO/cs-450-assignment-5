import React, { useState } from 'react';
import * as d3 from 'd3';

function BarChart(props) {
    const { data, selectedTarget } = props;
    const [selectedCategory, setSelectedCategory] = useState("day");

    const filteredData = data.filter(d => d[selectedTarget]);
    const groupedData = d3.group(filteredData, d => d[selectedCategory]);

    const averages = Array.from(groupedData, ([key, value]) => {
        const total = d3.sum(value, d => parseFloat(d[selectedTarget]));
        const average = total / value.length;
        return { category: key, average };
    });

    const yScale = d3.scaleLinear()
        .domain([0, Math.ceil(d3.max(averages, d => d.average) / 5) * 5])
        .range([300, 0]);

    const xScale = d3.scaleBand()
        .domain(averages.map(d => d.category))
        .range([60, 360])
        .padding(0.1);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    return (
        <div className="bar-chart-container">
            <svg width={400} height={400}>
                <g transform={`translate(0, 300)`}>
                    {xScale.domain().map((category, i) => (
                        <g key={i} transform={`translate(${xScale(category) + xScale.bandwidth() / 2}, 0)`}>
                            <text dy="1.25em" style={{ fontSize: '10px' }} textAnchor="middle">{category}</text>
                        </g>
                    ))}
                </g>
                <g transform={`translate(50, 0)`}>
                    {yScale.ticks().map((tick, i) => (
                        <g key={i} transform={`translate(0, ${yScale(tick)})`}>
                            <line x2={350} stroke="#ccc" />
                            <text dy="0.32em" style={{ fontSize: '10px' }} x="-9" y="0">{tick.toFixed(2)}</text>
                        </g>
                    ))}
                </g>
                {averages.map((d, i) => (
                    <g key={i}>
                        <rect
                            x={xScale(d.category)}
                            y={yScale(d.average)}
                            width={xScale.bandwidth()}
                            height={300 - yScale(d.average)}
                            fill="steelblue"
                        />
                        <text
                            x={xScale(d.category) + xScale.bandwidth() / 2}
                            y={yScale(d.average) - 5} 
                            fill="black"
                            textAnchor="middle"
                        >
                            {d.average.toFixed(2)}
                        </text>
                    </g>
                ))}
            </svg>
            <div className="radio-buttons">
                <label>
                    <input
                        type="radio"
                        value="sex"
                        checked={selectedCategory === "sex"}
                        onChange={handleCategoryChange}
                    />
                    Sex
                </label>
                <label>
                    <input
                        type="radio"
                        value="smoker"
                        checked={selectedCategory === "smoker"}
                        onChange={handleCategoryChange}
                    />
                    Smoker
                </label>
                <label>
                    <input
                        type="radio"
                        value="day"
                        checked={selectedCategory === "day"}
                        onChange={handleCategoryChange}
                    />
                    Day
                </label>
                <label>
                    <input
                        type="radio"
                        value="time"
                        checked={selectedCategory === "time"}
                        onChange={handleCategoryChange}
                    />
                    Time
                </label>
            </div>
        </div>
    );
}

export default BarChart;
