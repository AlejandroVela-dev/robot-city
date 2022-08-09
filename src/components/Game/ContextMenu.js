import './ContextMenu.css';

const ContextMenu = ({ robots, clickCoords, searchRobotAtCoords }) => {
  const lostRobots = robots.filter((robot) => !robot.hasBeenFound);

  const contextMenuStyle = {
    left: `${clickCoords.x}px`,
    top: `${clickCoords.y}px`,
  };

  return (
    <div className="context-menu" style={contextMenuStyle}>
      {lostRobots.map((robot) => (
        <li
          key={robot.id}
          onClick={() => {
            searchRobotAtCoords(robot, clickCoords);
          }}
        >
          <img src={robot.picture} alt={robot.name} />
          <p>{robot.name}</p>
        </li>
      ))}
    </div>
  );
};

export default ContextMenu;
