import { useState, useEffect } from 'react';
import Button from '../../utils/Button/Button';
import BtnBgTimer from '../../assets/images/btn-bg-timer.webp';
import IconTimer from '../../assets/images/icon-timer.webp';
import convertMsToTime from '../../utils/TimeFormatter';

const Timer = ({ isGameActive }) => {
  // Handles timer in milliseconds
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isGameActive) {
      // Game is active (looking for robots) > Timer starts.
      intervalId = setInterval(() => {
        setTimer((previousTimer) => previousTimer + 1000);
      }, 1000);
    } else {
      // Game is inactive (intro or scoreboard screen) > Reset timer text.
      setTimer(0);
    }

    // Interval clean-up everytime isGameActive changes.
    return () => {
      clearInterval(intervalId);
    };
  }, [isGameActive]);

  return (
    <>
      <Button
        text={convertMsToTime(timer)}
        backgroundImg={BtnBgTimer}
        icon={IconTimer}
      />
    </>
  );
};

export default Timer;
