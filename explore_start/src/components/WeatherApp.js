import React, { Component } from 'react';
import CurrentWeather from './CurrentWeather';
import './WeatherApp.css'

//weather app component, calls currentweather component
class WeatherApp extends Component {
    constructor(props) {
        super(props);
        this.state={
            lat: '',
            long: '',
            name: '',
            weather: ''
        };
    }
    getLat(lat) {
        this.setState({lat:lat});
        this.props.onLatSelect(this.state.lat);
    }
    getLong(long) {
        this.setState({long:long});
        this.props.onLongSelect(this.state.long);
    }
    getName(name) {
        this.setState({name:name});
        this.props.onNameSelect(this.state.name);
    }
    getWeather(weather) {
        this.setState({weather:weather});
        this.props.onWeatherSelect(this.state.weather);
    }
    render() {
        return (
            <div className="App">
                <h1 id="title">My Weather App</h1>
                <CurrentWeather onNameSelect={this.getName.bind(this)} onWeatherSelect={this.getWeather.bind(this)} onLatSelect={this.getLat.bind(this)} onLongSelect={this.getLong.bind(this)}>
                </CurrentWeather>
            </div>
        );
    }
}

export default WeatherApp;