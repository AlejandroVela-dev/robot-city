import './Welcome.css';
import Filter from 'bad-words';
import { useNotification } from '../../notifications/NotificationProvider';
const filter = new Filter();

const Welcome = ({ topScores, setPlayerName, robots, gameStart }) => {
  const Notification = useNotification();

  const isPlayerNameTaken = (playerName) => {
    return topScores.some((score) => score.playerName === playerName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const playerNameInput = e.target.playerName;
    const playerName = playerNameInput.value;

    // PlayerName Profanity Check
    if (filter.isProfane(playerName)) {
      playerNameInput.focus();
      Notification('error', 'Hey! No bad words allowed here!');
      return;
    }

    // Check if playerName already exists (prevents user not being able to properly identify its score)
    if (isPlayerNameTaken(playerName)) {
      playerNameInput.focus();
      Notification('error', 'Name already exists in the leaderboard');
      return;
    }

    // Game starts
    Notification('info', "Be quick! There's no time to waste!");
    setPlayerName(playerName);
    gameStart();
  };

  return (
    <div className="welcome">
      <form onSubmit={handleSubmit} className="welcome__content">
        <h2>Robot City</h2>
        <h5>Art by Egor Klyuchnyk</h5>
        <p>Beep beep! I am Alejandro, human/cyborg relations. And you are?</p>
        <input
          type="text"
          name="playerName"
          id="playerName"
          maxLength="24"
          autoFocus
          required
          autoComplete="off"
        />
        <p>
          Goodness! It's you! I probably did not recognize you because of the
          red arm...
        </p>
        <p>
          Anyway! I truly need your cooperation! Please help me find these
          disoriented robots!
        </p>
        <div className="robots">
          {robots.map((robot) => {
            return (
              <div className="robot-description" key={robot.id}>
                <img src={robot.picture} alt={robot.name} />
                <div className="robot-name">
                  <p>{robot.name}</p>
                  <p className="robot-origin">{robot.origin}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button type="submit" className="btn--start">
          Start
        </button>
      </form>
    </div>
  );
};

export default Welcome;
