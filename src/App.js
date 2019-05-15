import React, {Component} from 'react';
import './App.css';
import Moment from 'moment';

import Time from './components/Time';
import Temperature from './components/Temperature';
import Humidity from './components/Humidity';
import Pressure from './components/Pressure';
import Wind from './components/Wind';
import UVIndex from './components/UVIndex';
import TemperatureGraph from './components/TemperatureGraph';
import RainChanceGraph from './components/RainChanceGraph';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentWeather: {},
      forecast: {},
      currentLoaded: false,
      forecastLoaded: false,
      weatherHistory: [],
      uvIndex: 0,
      error: null,
      lastUpdateTime: Moment()
    }
  }

  componentDidMount() {
    this.updateData();
    this.updateInterval = setInterval(() => this.updateData(), 1000*60*5);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {

    //if (this.state.currentLoaded && this.state.forecastLoaded && !this.state.error)

    const {temp, humidity, pressure} = this.state.currentWeather.main ? this.state.currentWeather.main : 0;
    const { speed, direction } = this.state.currentWeather.wind ? this.state.currentWeather.wind : 0;
    const forecast = this.state.forecast.list ? this.state.forecast.list : [];

    return (
      <div className="App">
        <Time></Time>
        <div>Last updated: {this.state.lastUpdateTime.format("h:mm A")}</div>
        <br></br>
        <Temperature currentTemp={temp} humidity={humidity} windSpeed={speed}></Temperature>
        <br></br>
        <Humidity humidity={humidity}></Humidity>
        <br></br>
        <Pressure pressure={pressure}></Pressure>
        <br></br>
        <Wind speed={speed} direction={direction}></Wind>
        <br></br>
        <UVIndex uv={this.state.uvIndex}></UVIndex>
        <br></br>
        <TemperatureGraph history={this.state.weatherHistory} forecast={forecast} width={675} height={300}></TemperatureGraph>
        <br></br>
        <RainChanceGraph history={this.state.weatherHistory} forecast={forecast} width={675} height={300}></RainChanceGraph>
      </div>
    );
  }

  updateData() {
    // Get current weather
    fetch('https://api.openweathermap.org/data/2.5/weather?zip=15232,us&units=imperial&APPID=3cb6de73c631b0f4f5c720b82cbb6384')
      .then(res => res.json())
      .then(
        (result) => {
          if (result && result.cod && (result.cod === 200 || result.cod === "200")) {
            this.setState({
              currentWeather: result,
              currentLoaded: true,
              lastUpdateTime: Moment(),
              weatherHistory: this.state.weatherHistory.concat({
                time: Moment(),
                temperature: result.main.temp
              })
            });
            console.log("Refreshed at " + Moment().format("h:mm:ss A"));
          }
          else {
            console.log("Error" + result.cod +" at " + Moment().format("h:mm:ss A"));
          }
        },
        (error) => {
          this.setState({
            currentLoaded: true,
            error
          });
        }
      );

    // Get 5 day forecast
    fetch('https://api.openweathermap.org/data/2.5/forecast?zip=15232,us&units=imperial&APPID=3cb6de73c631b0f4f5c720b82cbb6384')
      .then(res => res.json())
      .then(
        (result) => {
          if (result && result.cod && (result.cod === 200 || result.cod === "200")) {
            this.setState({
              forecast: result,
              forecastLoaded: true
            });
          }
        },
        (error) => {
          this.setState({
            forecastLoaded: true,
            error
          });
        }
      );

    // Get UV index
    fetch('https://api.openweathermap.org/data/2.5/uvi?appid=3cb6de73c631b0f4f5c720b82cbb6384&lat=40.457652&lon=-79.936219')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            uvIndex: result.value,
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );
  }
}

export default App;
