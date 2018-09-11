import React, { Component } from 'react';
import './CurrentWeather.css';

class CurrentWeather extends Component {
    constructor() {
        super();
        this.state={
            zip: '',
            name: '',
            temp: '',
            weather: '',
            iconUrl: '',
            alt: '',
            lat: '',
            long: ''
        };
    }
    handleChange(event) {
        this.setState({
            zip:event.target.value
        });
    }
    mountWeather(event) {
        event.preventDefault();
        var zip = encodeURIComponent(this.state.zip);
        var urlBegin = 'https://api.openweathermap.org/data/2.5/weather?zip=';
        var urlEnd = '&APPID=41748103d538720927ae1916b821840b&units=imperial';
        var url = urlBegin + zip + urlEnd;
        fetch(url).then((response)=> {
            return response.json();
        }).then((info)=>{
            let data = info;
            this.props.onNameSelect(data.name);
            this.props.onWeatherSelect(data.weather[0].main);
            this.props.onLatSelect(data.coord.lat);
            this.props.onLongSelect(data.coord.lon);
            this.setState({
                name:data.name, 
                temp:data.main.temp + " °F", 
                weather:data.weather[0].main,
                iconUrl:"https://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
                alt:data.name + " weather",
                lat:data.coord.lat,
                long:data.coord.lon

            });
        }) 
    }
    render() {
        return (
            <div>
                <form onSubmit={this.mountWeather.bind(this)} className="inputForm">
                    <input id="zipin"
                        placeholder={"Enter valid zip code"}
                        type="text"
                        value={this.state.zip}
                        onChange={this.handleChange.bind(this)}
                    />
                </form>
                <div id="currentWeather">
                    <h2>{this.state.name}</h2>
                    <img id="icon" src={this.state.iconUrl} alt={this.state.alt}></img>
                    <h3>{this.state.weather}</h3>
                    <h2>{this.state.temp}</h2>
                </div>
            </div>
        );
    }
}

export default CurrentWeather;