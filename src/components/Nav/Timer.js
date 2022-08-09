import { useState, useEffect } from 'react';
import timeFormatter from '../../utils/timeFormatter';
import Button from '../../utils/Button/Button';
import BtnBgTimer from '../../assets/images/btn-bg-timer.webp';
import IconTimer from '../../assets/images/icon-timer.webp';

const Timer = ({ isGameActive }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    // Player has started looking for looking for Robots
    if (isGameActive) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    // Clean-up everytime isGameActive changes
    return () => {
      clearInterval(intervalId);
      setTime(0);
    };
  }, [isGameActive]);

  return (
    <>
      <Button
        text={timeFormatter(time)}
        backgroundImg={BtnBgTimer}
        icon={IconTimer}
      />
    </>
  );
};

export default Timer;
