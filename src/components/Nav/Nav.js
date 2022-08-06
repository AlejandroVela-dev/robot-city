import RosterChecklist from './RosterChecklist';
import Timer from './Timer';
import Button from '../../utils/Button/Button';
import btnBgLogo from '../../assets/images/btn-bg-logo.webp';
import './Nav.css';

const Nav = ({ isGameActive, lostRobots }) => {
  return (
    <nav>
      <Button text="Robot City" backgroundImg={btnBgLogo} />
      <RosterChecklist lostRobots={lostRobots} />
      <Timer isGameActive={isGameActive} />
    </nav>
  );
};

export default Nav;
