import './Nav.css';
import btnBgLogo from '../../assets/images/btn-bg-logo.webp';
import Button from '../../utils/Button/Button';
import RobotTracker from './RobotTracker';
import Timer from './Timer';

const Nav = ({ robots, isGameActive }) => {
  return (
    <nav>
      <Button text="Robot City" backgroundImg={btnBgLogo} />
      <RobotTracker robots={robots} />
      <Timer isGameActive={isGameActive} />
    </nav>
  );
};

export default Nav;
