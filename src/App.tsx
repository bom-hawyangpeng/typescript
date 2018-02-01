import * as React from 'react';
import { inject, observer } from 'mobx-react';
import './App.css';
import { WeatherResponse }  from './WeatherResponse';
import AppStore from './stores/AppStore';

interface Props {
  store?: AppStore;
}

interface State {
  string: string;
  position?: Coordinates;
  weather?: WeatherResponse;
}

@inject('store')
@observer
class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      string: '123'
    };
  }

  componentDidMount() {
    const { store } = this.props;
    store!.getPosition();    
  }

  render() {
    const { name, dt, main, weather }: Partial<WeatherResponse> = this.props.store!.weather;
    const temp = main && main.temp;
    const iconNumber = weather && weather[0].icon;
    
    return (
      <div className="App">
        <p>{name}</p>
        {iconNumber && <img src={`http://openweathermap.org/img/w/${iconNumber}.png`} />}
        <p>{temp}°C</p>
        <p>Issued: {dt}</p>
      </div>
    );
  }
}

export default App;
