import { mockWeather } from '../../mocks/mockWeather';
import '../weather/weatherpage.scss';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_weatherpage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Weatherpage = () => {
  return (
    <div className="weatherpage" style={backgroundStyle}>
      <div className="weather-container">
        <h1 className="page-title">Погода на Марсе</h1>

        <div className="weather-cards">
          {mockWeather.sol_keys.map((sol) => {
            const weatherData = mockWeather[sol];

            return (
              <div key={weatherData.sol} className="weather-card">
                <h2 className="sol">Sol {weatherData.sol}</h2>
                <p className="date">
                  {new Date(weatherData.time).toLocaleDateString()}
                </p>

                <div className="temperature">
                  <p className="temp-high">
                    Max: {weatherData.temperature.high}°C
                  </p>
                  <p className="temp-low">
                    Min: {weatherData.temperature.low}°C
                  </p>
                  <p className="temp-avg">
                    Average: {weatherData.temperature.average}°C
                  </p>
                </div>

                <div className="pressure">
                  <p>Pressure: {weatherData.pressure.average} Pa</p>
                </div>

                <div className="windspeed">
                  <p>Wind speed: {weatherData.windspeed.average} м/с</p>
                  <p>Direction: {weatherData.windspeed.direction}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Weatherpage;
