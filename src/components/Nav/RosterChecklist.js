import './RosterChecklist.css';

const RosterChecklist = ({ lostRobots }) => {
  return (
    <div className="roster-checklist">
      {lostRobots.map((robot) => {
        return (
          <div
            key={robot.id}
            className={`robot-picture-holder ${
              robot.hasBeenFound && 'found-robot'
            }`}
          >
            <img src={robot.picture} alt={robot.name} />
          </div>
        );
      })}
    </div>
  );
};

export default RosterChecklist;
