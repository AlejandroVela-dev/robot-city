import { useState } from 'react';
import { robotsData } from './data/robotsData';
import Modal from './utils/Modal/Modal';
import Intro from './components/Intro/Intro';
import Scoreboard from './components/Scoreboard/Scoreboard';
import Nav from './components/Nav/Nav';
import Game from './components/Game/Game';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  // Handles when game is active (looking for robots) or inactive (intro/scoreboard)
  const [isGameActive, setIsGameActive] = useState(false);

  // Handles playerName from Intro component to create a score
  const [playerName, setPlayerName] = useState('');

  // Stores start-end playerTime in order to create a score
  const [playerTime, setPlayerTime] = useState({ start: 0, end: 0 });

  // Handles content displayed inside Modal component
  const [modalContent, setModalContent] = useState('intro');

  // Handles if Modal appears on screen
  const [isModalActive, setIsModalActive] = useState(true);

  // Handles the list of Lost Robots and their status
  const [lostRobots, setLostRobots] = useState(robotsData);

  const handleGameStart = () => {
    setIsGameActive(true);
    setPlayerTime({ ...playerTime, start: Date.now() });
    setIsModalActive(false);
  };

  const handleGameEnd = () => {
    setIsGameActive(false);
    setLostRobots(robotsData);
    setPlayerTime({ ...playerTime, end: Date.now() });
    setModalContent('scoreboard');
    setIsModalActive(true);
  };

  const handleGameRestart = () => {
    setIsGameActive(false);
    setPlayerTime({ start: 0, end: 0 });
    setPlayerName('');
    setModalContent('intro');
  };

  // Returns the updated list of Lost Robots when a Robot is found
  const findRobot = (robotId) => {
    const updatedLostRobots = lostRobots.map((robot) => {
      if (robotId === robot.id) {
        return { ...robot, hasBeenFound: true };
      } else return robot;
    });
    setLostRobots(updatedLostRobots);
  };

  return (
    <>
      {isModalActive && (
        <Modal>
          {modalContent === 'intro' && (
            <Intro
              setPlayerName={setPlayerName}
              handleGameStart={handleGameStart}
              lostRobots={lostRobots}
            />
          )}
          {modalContent === 'scoreboard' && (
            <Scoreboard
              playerName={playerName}
              playerTime={playerTime.end - playerTime.start}
              handleGameRestart={handleGameRestart}
            />
          )}
        </Modal>
      )}
      <div className="app">
        <Nav
          handleGameEnd={handleGameEnd}
          isGameActive={isGameActive}
          lostRobots={lostRobots}
        />
        <Game
          lostRobots={lostRobots}
          findRobot={findRobot}
          handleGameEnd={handleGameEnd}
        />
        <Footer />
      </div>
    </>
  );
};

export default App;
