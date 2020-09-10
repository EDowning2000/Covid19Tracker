import React, { useState, useEffect } from "react";
import "./LineGraph.css";
import { Line } from "react-chartjs-2";

function LineGraph() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
      .then((res) => res.json())
      .then((data) => {
        console.log("linegraph data >>", data);
        const chartData = buildChartData(data);
        setData(chartData);
      });
  }, []);

  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;
    data[casesType].forEach((date) => {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data["cases"][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data["cases"][date];
    });
  };
  //test comment

  return (
    <div className="linegraph">
      {/* <Line data options /> */}
      <h2>im a temporary graph</h2>
    </div>
  );
}

export default LineGraph;
