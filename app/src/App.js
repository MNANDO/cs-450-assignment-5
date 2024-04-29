import React, { useEffect, useState } from 'react';
import './App.css';
import * as d3 from 'd3';
import data from './data/tips.csv';
import ScatterPlot from './ScatterPlot';
import BarChart from './BarChart';
import CorrelationMatrix from './CorrelationMatrix';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    d3.csv(data)
      .then((fetchedData) => {
        setCsvData(fetchedData);
        setOptions(Object.keys(fetchedData[0]));
      })
      .catch((error) => {
        console.error("Error loading the csv file at path");
      });
  }, []);

  useEffect(() => {
    console.log(options)
  }, [csvData])

  const onOptionChange = (e) => {
    setSelectedTarget(e.target.value);
  }

  return (
    <div className='container'>
      <div className='target-selector'>
        <p>Select target: </p>
         <select onChange={onOptionChange}>
          {options.map((option, index) => (
            <option value={option} key={index}>{option}</option>
          ))}
         </select>
      </div>
      <div className='bar-chart'>
        <BarChart data={csvData} selectedTarget={selectedTarget} />
      </div>
      <div className='correlation-matrix'>
        <CorrelationMatrix data={csvData} selectedTarget={selectedTarget} />
      </div>
      <div className='scatter-plot'>
        <ScatterPlot data={csvData} selectedTarget={selectedTarget} />
      </div>
    </div>
  );
}

export default App;
