import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import data from './data/tips.csv';
import ScatterPlot from './ScatterPlot';
import BarChart from './BarChart';
import CorrelationMatrix from './CorrelationMatrix';

function App() {
  const [csvData, setCsvData] = useState([]);
  const [selectedTarget, setSelectedTarget] = useState("");

  useEffect(() => {
    d3.csv(data)
      .then((fetchedData) => {
        setCsvData(fetchedData);
      })
      .catch((error) => {
        console.error("Error loading the csv file at path");
      });
  }, []);

  return (
    <div className='container'>
      <div className='target-selector'>
         
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
