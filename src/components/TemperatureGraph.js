import React, { Component } from "react";
import Graph from "./Graph";

export class TemperatureGraph extends Component {
  constructor(props) {
    super(props);
    window.onresize = (event) => {
      this.forceUpdate();
    };
  }

  render() {
    const { history, forecast } = this.props;

    var temperatureData = [];
    history.forEach((t) => {
      if (
        temperatureData.length === 0 ||
        temperatureData[temperatureData.length - 1].value !== t.temperature
      ) {
        temperatureData.push({
          time: t.time,
          value: t.temperature,
        });
      }
    });
    forecast.forEach((t) => {
      temperatureData.push({
        time: new Date(t.dt_txt),
        value: t.main.temp,
      });
    });

    var graphWidth = Math.round(window.innerWidth / 2.5);
    var graphHeight = graphWidth / 2;

    return (
      <div>
        <Graph
          ref="graph"
          width={graphWidth}
          height={graphHeight}
          data={temperatureData}
          color="red"
          timeScale="day"
          yUnit="°"
        ></Graph>
      </div>
    );
  }
}

export default TemperatureGraph;
