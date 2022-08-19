import './App.css';
import { useState } from 'react';
import getRandomRobots from './data/robotsData';
import { useFirestore } from './firebase/useFirestore';
import Modal from './utils/Modal/Modal';
import Welcome from './components/Welcome/Welcome';
import Leaderboard from './components/Leaderboard/Leaderboard';
import Nav from './components/Nav/Nav';
import Game from './components/Game/Game';
import Footer from './components/Footer/Footer';

const App = () => {
  // Stores topScores from Firestore and updates real-time
  const [topScores] = useFirestore();

  // Stores player properties. Set in "Welcome" component and read in "Leaderboard"
  const [playerName, setPlayerName] = useState('');
  const [playerTime, setPlayerTime] = useState({ start: 0, end: 0 });

  // List of Robots and their properties. Gets modified when a robot is found. Feeds UI and back-end fetch actions
  const [robots, setRobots] = useState(getRandomRobots());

  // Toggles between looking for robots or inactive (welcome/leaderboard). Used to control game Timer
  const [isGameActive, setIsGameActive] = useState(false);

  // Controls what should be displayed inside Modal component (Welcome/Leaderboard) and its current visibility
  const [modalContent, setModalContent] = useState('welcome');
  const [isModalVisible, setIsModalVisible] = useState(true);

  const gameStart = () => {
    setIsGameActive(true);
    setPlayerTime({ ...playerTime, start: Date.now() });
    setIsModalVisible(false);
  };

  const gameEnd = () => {
    setRobots(getRandomRobots()); // gameEnd is triggered when all Robots are found, we prevent loop by resetting data here
    setIsGameActive(false);
    setPlayerTime({ ...playerTime, end: Date.now() });
    setModalContent('leaderboard');
    setIsModalVisible(true);
  };

  const gameRestart = () => {
    setPlayerName();
    setPlayerTime({ start: 0, end: 0 });
    setModalContent('welcome');
  };

  const robotHasBeenFound = (robotId) => {
    const robotsUpdate = robots.map((robot) => {
      if (robotId === robot.id) {
        return { ...robot, hasBeenFound: true };
      } else return robot;
    });
    setRobots(robotsUpdate);
  };

  return (
    <>
      {isModalVisible && (
        <Modal>
          {modalContent === 'welcome' && (
            <Welcome
              topScores={topScores}
              setPlayerName={setPlayerName}
              robots={robots}
              gameStart={gameStart}
            />
          )}
          {modalContent === 'leaderboard' && (
            <Leaderboard
              topScores={topScores}
              playerName={playerName}
              playerTime={playerTime.end - playerTime.start}
              gameRestart={gameRestart}
            />
          )}
        </Modal>
      )}
      <div className="app">
        <Nav
          robots={robots}
          isGameActive={isGameActive}
          playerTime={playerTime}
        />
        <Game
          robots={robots}
          robotHasBeenFound={robotHasBeenFound}
          gameEnd={gameEnd}
        />
        <Footer />
      </div>
    </>
  );
};

export default App;
