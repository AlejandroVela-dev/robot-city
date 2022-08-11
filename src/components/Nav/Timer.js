import { useState, useEffect } from 'react';
import timeFormatter from '../../utils/timeFormatter';
import Button from '../../utils/Button/Button';
import BtnBgTimer from '../../assets/images/btn-bg-timer.webp';
import IconTimer from '../../assets/images/icon-timer.webp';

const Timer = ({ isGameActive, playerTime }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let intervalId;
    // Player has started looking for looking for Robots
    if (isGameActive) {
      intervalId = setInterval(() => {
        setTime(Math.abs(Date.now() - playerTime.start));
      }, 100);
    }
    // Clean-up everytime isGameActive changes
    return () => {
      clearInterval(intervalId);
      setTime(0);
    };
  }, [isGameActive, playerTime]);

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
