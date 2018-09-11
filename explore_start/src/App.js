import React, { Component } from 'react';
import './App.css';
import scriptLoader from 'react-async-script-loader';
import WeatherApp from './components/WeatherApp.js'


//renders Map and adds markers
//some of this code comes direct from the Google Maps API documentation
class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            lat: '',
            long: '',
            map: '',
            title: '',
            name: '',
            weather: '',
            markers: []
        };
    }
    //renders the map
    componentWillReceiveProps({isScriptLoadSucceed}){
        if (isScriptLoadSucceed) {
            this.setState({map: new window.google.maps.Map(document.getElementById('map'), {
                zoom: 4,
                center: {lat: 39.8283, lng: -98.5795}
            })
            });
        }
        else{
            alert("script not loaded");
        }
    }
    getName(name) {
        this.setState({name:name});
    }
    getWeather(weather) {
        this.setState({weather:weather});
    }
    getLat(lat) {
        this.setState({lat:lat});
    }
    getLong(long) {
        this.setState({long:long});
        this.Mount();
    }
    //mounts new markers onto map
    Mount() {
        this.setState({ markers: this.state.markers.concat({lat:this.state.lat, lng:this.state.long, name:this.state.name, weather:this.state.weather})
        });
        for(var m of this.state.markers) {
            new window.google.maps.Marker({
            position: {lat: m.lat, lng: m.lng},
            map: this.state.map,
            title: m.name + ' weather is ' +m.weather
        });

        }
    }
    render(){
        return(
            <div>
                <WeatherApp onNameSelect={this.getName.bind(this)} onWeatherSelect={this.getWeather.bind(this)} onLatSelect={this.getLat.bind(this)} onLongSelect={this.getLong.bind(this)}>
                </WeatherApp>
                <div id="map" style={{height: "400px"}}></div>
            </div>
        );
    }
}


export default scriptLoader(
    ["https://maps.googleapis.com/maps/api/js?key=AIzaSyDyDpi0QdisHQc50l3p5jQkl6f-AC6Qb5s"]
)(App);


