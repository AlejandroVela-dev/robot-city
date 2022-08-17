import './ContextMenu.css';

const ContextMenu = ({
  gameSize,
  robots,
  clickCoords,
  searchRobotAtCoords,
}) => {
  const lostRobots = robots.filter((robot) => !robot.hasBeenFound);

  // Handles limits for translate transformations in CSS (prevents ContextMenu going outside of main image)
  const contextMenuStyle = {
    '--click-x': `${clickCoords.x}px`,
    '--click-y': `${clickCoords.y}px`,
    '--imgWidth': `${gameSize.x}px`,
    '--imgHeight': `${gameSize.y}px`,
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
