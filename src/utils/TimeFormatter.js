const timeFormatter = (time) => {
  const date = new Date(time);
  let ms = Math.floor(date.getMilliseconds() / 10);
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();

  // String formatting
  ms = ms.toString().padStart(2, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return `${minutes}:${seconds}:${ms}`;
};

export default timeFormatter;
