export interface WeatherResponse extends Response {
  base: string;
  clouds: object;
  cod: number;
  coords: object;
  dt: number;
  id: number;
  main: WeatherToday;
  name: string;
  sys: object;
  visibility: number;
  weather: Array<WeatherIcon>;
  wind: object;
}

export type WeatherToday = {
  humidity: number;
  pressure: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export type WeatherIcon = {
  description: string;
  icon: string;
  id: number;
  main: string;
}