import './Nav.css';
import btnBgLogo from '../../assets/images/btn-bg-logo.webp';
import Button from '../../utils/Button/Button';
import RobotTracker from './RobotTracker';
import Timer from './Timer';

const Nav = ({ robots, isGameActive, playerTime }) => {
  return (
    <nav>
      <Button
        text="Robot City"
        backgroundImg={btnBgLogo}
        additionalClassName={'btn--logo'}
      />
      <RobotTracker robots={robots} />
      <Timer isGameActive={isGameActive} playerTime={playerTime} />
    </nav>
  );
};

export default Nav;
