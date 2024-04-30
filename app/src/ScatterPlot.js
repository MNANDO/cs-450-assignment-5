import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

/**
 * Scatter Plot Component
 * This will take data and selectedTarget as props
 */
function ScatterPlot(props) {
	const svgRef = useRef();
	// const { data, selectedTarget } = props;
    const { data } = props; // just testing with data
    const selectedTarget = 'total_bill';

    useEffect(() => {
        if (!data) return;

        const margin = { top: 20, right: 30, bottom: 40, left: 50 };
        const height = 400 - margin.top - margin.bottom;

        const svg = d3.select(svgRef.current)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const resizeHandler = () => {
            const parentWidth = svgRef.current.parentElement.clientWidth;
            const width = parentWidth - margin.left - margin.right;

            svgRef.current.setAttribute("width", width);

            const x = d3.scaleLinear()
                .domain([0, 50])
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain([0, 10]) // Adjusted y-axis domain to range from 0 to 10
                .range([height, 0]);

            svg.selectAll("g").remove(); // Remove existing axes
            svg.selectAll("circle").remove(); // Remove existing circles

            svg.append("rect")
                .attr("width", width)
                .attr("height", height)
                .attr("fill", "#f5f5f5"); // Light grey background

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x).ticks(6).tickFormat(d3.format(".0f")))
                .append("text")
                .attr("x", width / 2)
                .attr("y", margin.bottom - 10)
                .attr("fill", "#000")
                .attr("text-anchor", "middle")
                .text("Total Bill");

            svg.append("g")
                .call(d3.axisLeft(y).ticks(6)) // Adjusted ticks to go up by 2 and range from 0 to 10
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", -margin.left + 10)
                .attr("x", -height / 2)
                .attr("dy", "1em")
                .attr("fill", "#000")
                .attr("text-anchor", "middle")
                .text("Tip");

            svg.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => x(d.total_bill))
                .attr("cy", d => y(d.tip))
                .attr("r", 5);
        };

        resizeHandler(); // Initial call to set dimensions

        window.addEventListener("resize", resizeHandler); // Add resize event listener

        return () => {
            window.removeEventListener("resize", resizeHandler); // Remove resize event listener on cleanup
        };
    }, [data]);

	return (
        <svg ref={svgRef}></svg>
    );
}

export default ScatterPlot;
