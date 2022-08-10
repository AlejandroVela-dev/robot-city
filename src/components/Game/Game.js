import './Game.css';
import RobotCity from '../../assets/images/main-robotcity.webp';
import { useState, useEffect, useRef } from 'react';
import { getRobotCoords } from '../../firebase/useFirestore';
import { useNotification } from '../../notifications/NotificationProvider';
import ContextMenu from './ContextMenu';

const Game = ({ robots, robotHasBeenFound, gameEnd }) => {
  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 });
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  const Notification = useNotification();
  const imgRef = useRef(); // Will provide access to Image DOM element for width/height measurements when locating robots

  const toggleContextMenu = () => {
    setIsContextMenuVisible((prevStatus) => !prevStatus);
  };

  const contextMenuTrigger = (e) => {
    if (!isContextMenuVisible) {
      setClickCoords({ x: e.pageX, y: e.pageY });
    }
    toggleContextMenu();
  };

  const getRelativeCoords = (coords) => {
    return {
      relX: coords.x / imgRef.current.offsetWidth,
      relY: coords.y / imgRef.current.offsetHeight,
    };
  };

  const isRobotAtCoords = (relativeCoords, robotCoords) => {
    /* MarginX/Y work as a 'hitbox' around the robot x/y location */
    const isRobotAtX =
      Math.abs(relativeCoords.relX - robotCoords.relX) < robotCoords.marginX;
    const isRobotAtY =
      Math.abs(relativeCoords.relY - robotCoords.relY) < robotCoords.marginY;
    return isRobotAtX && isRobotAtY;
  };

  const searchRobotAtCoords = async (robot, coords) => {
    const robotCoords = await getRobotCoords(robot.id);
    if (!robotCoords) return;

    const relativeCoords = getRelativeCoords(coords);

    if (isRobotAtCoords(relativeCoords, robotCoords)) {
      robotHasBeenFound(robot.id);
      Notification('success', `${robot.name} was found!`);
    } else {
      Notification('error', `That's not ${robot.name}... Keep looking!`);
    }

    toggleContextMenu();
  };

  useEffect(() => {
    if (robots.every((robot) => robot.hasBeenFound)) {
      gameEnd();
    }
  }, [robots, gameEnd]);

  return (
    <div className="game">
      <img
        ref={imgRef}
        onClick={contextMenuTrigger}
        className="main-robot-city"
        src={RobotCity}
        alt="Robot City"
      />
      {isContextMenuVisible && (
        <ContextMenu
          robots={robots}
          clickCoords={clickCoords}
          searchRobotAtCoords={searchRobotAtCoords}
        />
      )}
    </div>
  );
};

export default Game;