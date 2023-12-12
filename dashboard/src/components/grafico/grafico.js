import React from "react";
/* import { Chart } from "react-google-charts"; */
import './grafico.css'

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  title: "My Daily Activities",
};

export default function grafico() {
  return (
    <section className="grafi">
      {/* <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"90%"}
      height={"400px"}
    /> */}
    </section>
    
  );
}
