import './ContextMenu.css';

const ContextMenu = ({ lostRobots, searchCoords, handleContextMenuClick }) => {
  // List of Lost Robots yet to be found
  const missingRobots = lostRobots
    .filter((robot) => !robot.hasBeenFound)
    .map((robot) => (
      <li
        key={robot.id}
        onClick={(e) => {
          e.stopPropagation();
          handleContextMenuClick(robot, searchCoords);
        }}
      >
        <img src={robot.picture} alt={robot.name} />
        {robot.name}
      </li>
    ));

  return (
    <div
      className="context-menu"
      style={{
        left: `${searchCoords.x}px`,
        top: `${searchCoords.y}px`,
      }}
    >
      {missingRobots}
    </div>
  );
};

export default ContextMenu;
