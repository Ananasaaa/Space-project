export const getLastDates = () => {
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formatted = date.toISOString().split('T')[0];
    dates.push(formatted);
  }
  return dates;
};
