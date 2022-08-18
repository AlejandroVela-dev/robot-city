import { useEffect, useCallback, useState } from 'react';
import NotificationIcons from './NotificationIcons';
import './Notification.css';

const Notification = ({ id, type, message, dispatch }) => {
  // Handles the width of a Display-time bar under notification box. Acts as a timer before notification disappears.
  const [barWidth, setBarWidth] = useState(0);

  // Timer ID (so it can be cleared when bar is full or stopped when user hovers on notification).
  const [intervalId, setIntervalId] = useState();

  // Boolean that controls slide-out animation triggering.
  const [isBarFull, setIsBarFull] = useState(false);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setBarWidth((previousBarWidth) => {
        if (previousBarWidth < 100) {
          // When bar is not full, increases bar width 0.5% every 20ms (4s total)
          return previousBarWidth + 0.5;
        }
        clearInterval(id);
        return previousBarWidth;
      });
    }, 20);
    setIntervalId(id);
  };

  const handlePauseTimer = useCallback(() => {
    clearInterval(intervalId);
  }, [intervalId]);

  const handleCloseNotification = useCallback(() => {
    handlePauseTimer(intervalId);
    setIsBarFull(true);
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        id: id,
      });
    }, 500);
  }, [handlePauseTimer, intervalId, dispatch, id]);

  // Starts timer when Notification is rendered
  useEffect(() => {
    handleStartTimer();
  }, []);

  useEffect(() => {
    if (barWidth === 100) {
      handleCloseNotification();
    }
  }, [barWidth, handleCloseNotification]);

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification-item ${type} ${
        isBarFull ? 'close-notification' : ''
      }`}
    >
      <div className="notification-body">
        <img src={NotificationIcons[type]} alt={type} width="20" height="20" />
        <p>{message}</p>
      </div>
      <div className="bar" style={{ width: `${barWidth}%` }} />
    </div>
  );
};

export default Notification;
