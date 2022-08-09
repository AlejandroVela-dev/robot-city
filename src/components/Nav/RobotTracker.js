import './RobotTracker.css';

const RobotTracker = ({ robots }) => {
  return (
    <div className="robot-tracker">
      {robots.map((robot) => {
        return (
          <div
            key={robot.id}
            className={`robot-picture ${robot.hasBeenFound && 'found-robot'}`}
          >
            <img src={robot.picture} alt={robot.name} />
          </div>
        );
      })}
    </div>
  );
};

export default RobotTracker;
