import React from 'react';
import * as d3 from 'd3';

function CorrelationMatrix(props) {
    const { data } = props;

    // Extract the necessary parameters from the data
    const parameters = ['total_bill', 'tip', 'size'];

    // Calculate the correlation coefficients
    const correlations = parameters.map(param1 => (
        parameters.map(param2 => {
            const correlation = d3.mean(data, d => d[param1] * d[param2]) -
                d3.mean(data, d => d[param1]) * d3.mean(data, d => d[param2]);
            return correlation / (d3.deviation(data, d => d[param1]) * d3.deviation(data, d => d[param2]));
        })
    ));

    // Define color scale for the heatmap
    const customColorScale = d3.scaleLinear()
        .domain([.5, 1])
        .range(['rgb(49, 55, 150)', 'rgb(200, 200, 200)', 'rgb(147, 197, 222)']); // Custom RGB values

    const cellSize = 90;
    const matrixWidth = cellSize * parameters.length;
    const matrixHeight = cellSize * parameters.length;
    const legendWidth = 20;
    const legendHeight = matrixHeight;

    // Define margins
    const margin = { top: 20, right: 40, bottom: 60, left: 70 };
    const width = matrixWidth + legendWidth + margin.left + margin.right;
    const height = matrixHeight + margin.top + margin.bottom;

    return (
        <div className="correlation-matrix-container">
            <svg width={width} height={height}>
                {/* Add margin by translating the entire SVG */}
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    {/* Heatmap */}
                    {correlations.map((row, i) => (
                        row.map((correlation, j) => (
                            <rect
                                key={`${i}-${j}`}
                                x={j * cellSize}
                                y={i * cellSize}
                                width={cellSize}
                                height={cellSize}
                                fill={customColorScale(correlation)}
                            />
                        ))
                    ))}

                    {/* Color legend */}
                    <defs>
                        <linearGradient id="colorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgb(49, 55, 150)" />
                            <stop offset="50%" stopColor="rgb(200, 200, 200)" />
                            <stop offset="100%" stopColor="rgb(200, 200, 200)" /> {/* This stop remains constant */}
                        </linearGradient>
                    </defs>
                    <rect x={matrixWidth + 10} y={0} width={legendWidth} height={legendHeight} fill="url(#colorGradient)" />

                    {/* Marker text */}
                    <text x={matrixWidth + 40} y={legendHeight} dy="-0.5em" textAnchor="middle">1</text>
                    <text x={matrixWidth + 45} y="0.5em" textAnchor="middle">0.5</text>


                    {/* Axis labels */}
                    {parameters.map((param, i) => (
                        <>
                            <text
                                key={`col-${i}`}
                                x={i * cellSize + cellSize / 2}
                                y={-5}
                                textAnchor="middle"
                            >
                                {param}
                            </text>
                            <text
                                key={`row-${i}`}
                                x={-5}
                                y={i * cellSize + cellSize / 2}
                                textAnchor="end"
                                alignmentBaseline="middle"
                            >
                                {param}
                            </text>
                        </>
                    ))}
                </g>
            </svg>
        </div>
    );
}

export default CorrelationMatrix;
