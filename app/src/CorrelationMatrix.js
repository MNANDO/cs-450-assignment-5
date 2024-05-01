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
    const colorScale = d3.scaleSequential(d3.interpolateRdYlBu)
        .domain([-1, 1]);

    // Define dimensions
    const cellSize = 80;
    const width = cellSize * parameters.length;
    const height = cellSize * parameters.length;
    const legendWidth = 20;
    const legendHeight = height;

     // Create linear gradient for color legend
     const defs = (
        <defs>
            <linearGradient id="colorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colorScale(-1)} />
                <stop offset="50%" stopColor={colorScale(0)} />
                <stop offset="100%" stopColor={colorScale(1)} />
            </linearGradient>
        </defs>
    );

    return (
        <div className="correlation-matrix-container">
            <rect x={width} y={20} width={legendWidth} height={legendHeight} fill="url(#colorGradient)" />
            <svg width={width + 100} height={height + 50}>
                {correlations.map((row, i) => (
                    row.map((correlation, j) => (
                        <rect
                            key={`${i}-${j}`}
                            x={j * cellSize}
                            y={i * cellSize}
                            width={cellSize}
                            height={cellSize}
                            fill={colorScale(correlation)}
                        />
                    ))
                ))}
                {parameters.map((param, i) => (
                    <>
                        <text
                            key={`col-${i}`}
                            x={i * cellSize + cellSize / 2}
                            y={-5}
                            textAnchor="middle"
                            fill="black"
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
            </svg>
        </div>
    );
}

export default CorrelationMatrix;
