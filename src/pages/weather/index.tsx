import { useGetMarsWeatherQuery } from '../../redux/apiSlice';
import '../weather/weatherpage.scss';
import { useState } from 'react';

const backgroundStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/img/bg_weatherpage.jpg)`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

const Weatherpage = () => {
  const { data, isLoading, isError } = useGetMarsWeatherQuery(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');

  if (isLoading) return <p className="loading">Loading...</p>;
  if (isError || !data) return <p className="error">Error loading data</p>;

  const convertTemp = (tempC: number | undefined) => {
    if (tempC === undefined) return 'N/A';
    return unit === 'C' ? `${tempC}°C` : `${(tempC * 9) / 5 + 32}°F`;
  };

  return (
    <div className="weatherpage" style={backgroundStyle}>
      <div className="weather-container">
        <h1 className="page-title">Weather on Mars</h1>
        <button
          className="unit-toggle"
          onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
        >
          Switch to °{unit === 'C' ? 'F' : 'C'}
        </button>

        <div className="weather-cards">
          {data.sol_keys.map((sol: string) => {
            const solData = data[sol];

            return (
              <div key={sol} className="weather-card fade-in">
                <h2 className="sol">Sol {sol}</h2>
                <p className="date">
                  {new Date(solData.First_UTC).toLocaleDateString()}
                </p>

                <div className="temperature">
                  <p className="temp-high">
                    Max: {convertTemp(solData.AT?.mx)}
                  </p>
                  <p className="temp-low">Min: {convertTemp(solData.AT?.mn)}</p>
                  <p className="temp-avg">
                    Average: {convertTemp(solData.AT?.av)}
                  </p>
                </div>

                <div className="pressure">
                  <p>Pressure: {solData.PRE?.av ?? 'N/A'} Pa</p>
                </div>

                <div className="windspeed">
                  <p>
                    Wind direction:{' '}
                    {solData.WD?.most_common?.compass_point ?? 'N/A'}
                  </p>
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
