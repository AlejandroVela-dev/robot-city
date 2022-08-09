import './Leaderboard.css';
import { useEffect, useState } from 'react';
import { getScores, addScore } from '../../firebase/useFirestore';
import { useNotification } from '../../notifications/NotificationProvider';
import Preloader from '../../utils/Preloader';
import TopScores from './TopScores';
import GameResults from './GameResults';
import timeFormatter from '../../utils/timeFormatter';

const Leaderboard = ({ playerName, playerTime, gameRestart }) => {
  const [topScores, setTopScores] = useState([]);
  const [isTopScore, setIsTopScore] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const Notification = useNotification();

  const submitScore = async () => {
    setIsDataLoading(true);
    // Submits score to database
    const docRef = await addScore({ playerName, playerTime });
    if (!docRef) return;
    Notification('success', `Your score was successfully saved!`);
    // Retrieves and updates top scores
    const scores = await getScores(5);
    if (!scores) return;
    setTopScores(scores);
    // Disables preloader
    setIsDataLoading(false);
  };

  useEffect(() => {
    const dataLoad = async () => {
      // Retrieves and set top scores
      const scores = await getScores(5);
      if (!scores) return;
      setTopScores(scores);
      // Disables preloader
      setIsDataLoading(false);
      // Checks if playerTime is a new topScore
      if (playerTime < scores.at(-1)?.playerTime) {
        setIsTopScore(true);
      }
    };
    dataLoad();
  }, [playerTime]);

  return (
    <div className="leaderboard">
      <div className="leaderboard__content">
        <h2>Leaderboard</h2>
        <h5>Top Scores</h5>
        <div className="scores">
          <div className="score">
            <h3>Username</h3>
            <h3>Time</h3>
          </div>
          {isDataLoading ? <Preloader /> : <TopScores scores={topScores} />}
          <div className="score player-score">
            <p>{playerName}</p>
            <p>{timeFormatter(playerTime)}</p>
          </div>
        </div>
        <GameResults isTopScore={isTopScore} submitScore={submitScore} />
        <button className="btn--retry" onClick={gameRestart}>
          Retry
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
