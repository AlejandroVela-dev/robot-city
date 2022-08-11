const timeFormatter = (time) => {
  const date = new Date(time);
  let ms = date.getMilliseconds();
  let seconds = date.getSeconds();
  let minutes = date.getMinutes();

  // String formatting
  ms = ms.toString().padStart(3, '0');
  minutes = minutes.toString().padStart(2, '0');
  seconds = seconds.toString().padStart(2, '0');

  return `${minutes}:${seconds}:${ms}`;
};

export default timeFormatter;
