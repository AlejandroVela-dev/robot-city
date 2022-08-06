import './Scoreboard.css';
import ScoreForm from './ScoreForm';
import Preloader from '../../utils/Preloader';
import convertMsToTime from '../../utils/TimeFormatter';
import { useEffect, useState } from 'react';
import { getScores, addScore } from '../../firebase/useFirestore';
import { useNotification } from '../../notifications/NotificationProvider';

const Scoreboard = ({ playerName, playerTime, handleGameRestart }) => {
  const [topScores, setTopScores] = useState([]);
  const [isPlayerScoreTopScore, setIsPlayerScoreTopScore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showScoreForm, setShowScoreForm] = useState(false);

  const NotificationDispatcher = useNotification();

  const handleFormSubmit = async () => {
    setIsLoading(true);
    const docRef = await addScore({ playerName, playerTime });
    if (!docRef) return;
    NotificationDispatcher({
      type: 'success',
      message: `Your document was added with ID: ${docRef.id}`,
    });
    const scores = await getScores(5);
    if (!scores) return;
    // Updates topScores
    setTopScores(scores);
    setIsLoading(false);
    setShowScoreForm(false);
  };

  useEffect(() => {
    const initialLoad = async () => {
      const scores = await getScores(5);
      if (!scores) return;
      // Updates topScores
      setTopScores(scores);
      setIsLoading(false);
      // Checks if playerTime is a new topScore
      if (playerTime > scores.at(-1)?.playerTime) {
        setIsPlayerScoreTopScore(false);
      }
      setShowScoreForm(true);
    };
    initialLoad();

    return () => {
      setTopScores([]);
    };
  }, [playerTime]);

  return (
    <div className="scoreboard">
      <div className="scoreboard__content">
        <h2>Scoreboard</h2>
        <h5>Top Scores</h5>
        <div className="scores">
          <div className="score">
            <h3>Username</h3>
            <h3>Time</h3>
          </div>
          {isLoading ? (
            <Preloader />
          ) : (
            <>
              {topScores.map((topScore) => {
                return (
                  <div key={topScore.id} className="score">
                    <p className="score--playerName">{topScore.playerName}</p>
                    <p className="score--playerTime">
                      {convertMsToTime(topScore.playerTime)}
                    </p>
                  </div>
                );
              })}
            </>
          )}
          <div className="score player-score">
            <p>{playerName}</p>
            <p>{convertMsToTime(playerTime)}</p>
          </div>
        </div>
        {showScoreForm && (
          <ScoreForm
            isPlayerScoreTopScore={isPlayerScoreTopScore}
            handleFormSubmit={handleFormSubmit}
            setShowScoreForm={setShowScoreForm}
          />
        )}
        <button className="btn--retry" onClick={handleGameRestart}>
          Retry
        </button>
      </div>
    </div>
  );
};

export default Scoreboard;
