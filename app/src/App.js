import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import data from './data/tips.csv'

function App() {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    d3.csv(data)
      .then((fetchedData) => {
        setCsvData(fetchedData);
      })
      .catch((error) => {
        console.error("Error loading the csv file at path");
      });
  }, []);

  useEffect(() => {
    console.log(csvData)
  }, [csvData])

  return (
    <div className="App">
    </div>
  );
}

export default App;
