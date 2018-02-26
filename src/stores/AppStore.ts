import { action, observable } from 'mobx';

// import { WeatherResponse }  from '../WeatherResponse';

const API_KEY = '8e5f0ddb3996f714c926941ffc709756';
const API_URL = 'https://api.openweathermap.org/data/2.5/';

type Position = {
  latitude: number;
  longitude: number;
};

export default class AppStore {

  @observable position: Position;
  @observable loadingWeather: boolean = false;
  @observable weather: Object = {};

  getPosition(): Promise<Position> {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };

          this.position = pos;       
          resolve(pos);
        },
        (error) => {
          console.log(error);
        }, 
        options);
      } else {
        reject();
      }
    });
  }

  @action async getWeather(): Promise<void> {
    this.loadingWeather = true;
    const pos: Position = this.position || await this.getPosition();
    
    const latitude: number = pos.latitude;
    const longitude: number = pos.longitude;
    
    const response = await fetch(`${API_URL}weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${API_KEY}`);
    this.weather = await response.json();
    this.loadingWeather = false;
  }
}