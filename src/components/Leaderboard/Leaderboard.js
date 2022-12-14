import './Leaderboard.css';
import { useEffect, useState } from 'react';
import { addScore } from '../../firebase/useFirestore';
import { useNotification } from '../../notifications/NotificationProvider';
import Preloader from '../../utils/Preloader';
import TopScores from './TopScores';
import GameResults from './GameResults';
import timeFormatter from '../../utils/timeFormatter';

const Leaderboard = ({ topScores, playerName, playerTime, gameRestart }) => {
  const [isTopScore, setIsTopScore] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const Notification = useNotification();

  const submitScore = async () => {
    setIsDataLoading(true);
    // Submits score to database
    const scoreRef = await addScore({ playerName, playerTime });
    if (!scoreRef) return;
    Notification('success', `Your score was recorded successfully!`);
    setIsDataLoading(false);
  };

  useEffect(() => {
    // Checks if playerTime is a new topScore
    if (topScores.length < 5) {
      setIsTopScore(true);
    } else {
      playerTime < topScores.at(-1)?.playerTime
        ? setIsTopScore(true)
        : setIsTopScore(false);
    }
  }, [playerTime, topScores]);

  return (
    <div className="leaderboard">
      <div className="leaderboard__content">
        <h1>Leaderboard</h1>
        <p>Top Scores</p>
        <div className="scores">
          <div className="score--header">
            <h2>Username</h2>
            <h2>Time</h2>
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
