import './RobotTracker.css';

const RobotTracker = ({ robots }) => {
  return (
    <div className="robot-tracker">
      {robots.map((robot) => {
        return (
          <div
            key={robot.id}
            className={`robot-picture ${
              robot.hasBeenFound ? 'found-mark' : ''
            }`}
          >
            <img src={robot.picture} alt={robot.name} width="71" height="71" />
          </div>
        );
      })}
    </div>
  );
};

export default RobotTracker;
