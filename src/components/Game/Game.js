import './Game.css';
import RobotCity from '../../assets/images/main-robotcity.webp';
import ContextMenu from './ContextMenu';
import { useState, useEffect, useRef } from 'react';
import { useNotification } from '../../notifications/NotificationProvider';
import { getRobotCoords } from '../../firebase/useFirestore';

const Game = ({ lostRobots, findRobot, handleGameEnd }) => {
  const [searchCoords, setContextMenuCoords] = useState({ x: 0, y: 0 });
  const [isContextMenuActive, setIsContextMenuActive] = useState(false);

  const NotificationDispatcher = useNotification();
  const gameRef = useRef();

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (!isContextMenuActive) {
      setContextMenuCoords({ x: e.pageX, y: e.pageY });
    }
    // Toggle Menu when clicked outside of an active menu
    setIsContextMenuActive((prevStatus) => !prevStatus);
  };

  const isRobotAtCoords = (relativeSearchCoords, robotCoords) => {
    const searchX =
      Math.abs(relativeSearchCoords.relX - robotCoords.relX) <
      robotCoords.marginX;
    const searchY =
      Math.abs(relativeSearchCoords.relY - robotCoords.relY) <
      robotCoords.marginY;
    console.log(searchX, searchY);
    return searchX && searchY;
  };

  const handleContextMenuClick = async (robot, searchCoords) => {
    const robotCoords = await getRobotCoords(robot.id);
    if (!robotCoords) return;

    const robotCitySize = {
      width: gameRef.current.offsetWidth,
      height: gameRef.current.offsetHeight,
    };

    const relativeSearchCoords = {
      relX: searchCoords.x / robotCitySize.width,
      relY: searchCoords.y / robotCitySize.height,
    };

    console.log(relativeSearchCoords);
    console.log(robotCoords);

    if (isRobotAtCoords(relativeSearchCoords, robotCoords)) {
      findRobot(robot.id);
      NotificationDispatcher({
        type: 'success',
        message: `${robot.name} was found!`,
      });
    } else {
      NotificationDispatcher({
        type: 'error',
        message: `That's not ${robot.name}... Keep looking!`,
      });
    }
    setIsContextMenuActive(false);
  };

  // Listens to lostRobots and finishes game when all have been found
  useEffect(() => {
    if (lostRobots.every((robot) => robot.hasBeenFound)) {
      handleGameEnd();
    }
  }, [lostRobots, handleGameEnd]);

  return (
    <div className="game" ref={gameRef}>
      <img
        className="main-robot-city"
        onClick={handleContextMenu}
        src={RobotCity}
        alt="Robot City"
      />
      {isContextMenuActive && (
        <ContextMenu
          lostRobots={lostRobots}
          searchCoords={searchCoords}
          handleContextMenuClick={handleContextMenuClick}
        />
      )}
    </div>
  );
};

export default Game;
