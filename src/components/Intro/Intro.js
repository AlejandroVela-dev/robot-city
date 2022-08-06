import './Intro.css';
import Filter from 'bad-words';
import { useNotification } from '../../notifications/NotificationProvider';

const Intro = ({ setPlayerName, handleGameStart, lostRobots }) => {
  const NotificationDispatcher = useNotification();
  const profanityFilter = new Filter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const playerNameInput = e.target.playerName;

    if (profanityFilter.isProfane(playerNameInput.value)) {
      NotificationDispatcher({
        type: 'error',
        message: 'Hey! No bad words allowed!',
      });
      playerNameInput.focus();
    } else {
      // PlayerName isn't profane, game starts
      setPlayerName(playerNameInput.value);
      handleGameStart();
      NotificationDispatcher({
        type: 'info',
        message: 'Game just started! Be quick!',
      });
    }
  };

  return (
    <div className="intro">
      <form onSubmit={handleSubmit} className="intro__content">
        <h2>Robot City</h2>
        <h5>Art by Egor Klyuchnyk</h5>
        <p>Beep beep! I am Alejandro, human/cyborg relations. And you are?</p>
        <input
          type="text"
          name="playerName"
          id="playerName"
          maxLength="36"
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
          {lostRobots.map((robot) => {
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

export default Intro;
