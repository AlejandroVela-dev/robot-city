import timeFormatter from '../../utils/timeFormatter';

const TopScores = ({ scores }) => {
  return (
    <>
      {scores.map((score) => {
        return (
          <div key={score.id} className="score">
            <p className="score--playerName">{score.playerName}</p>
            <p className="score--playerTime">
              {timeFormatter(score.playerTime)}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default TopScores;
