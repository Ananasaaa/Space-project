import { getLastSevenDates } from '../getDates/getLastSevenDates';

export const fetchLastSevenImg = async (apiKey: string) => {
  const dates = getLastSevenDates();

  const requests = dates.map((date) =>
    fetch(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`
    ).then((res) => res.json())
  );

  return Promise.all(requests);
};
