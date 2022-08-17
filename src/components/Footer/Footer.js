import './Footer.css';
import Button from '../../utils/Button/Button';
import IconGitHub from '../../assets/images/icon-github.webp';
import IconCredit from '../../assets/images/icon-credit.webp';
import BackgroundGitHub from '../../assets/images/btn-bg-github.webp';
import BackgroundCredit from '../../assets/images/btn-bg-credit.webp';

const Footer = () => {
  return (
    <footer>
      <Button
        text="GitHub"
        link="https://github.com/AlejandroVela-dev/robot-city"
        icon={IconGitHub}
        backgroundImg={BackgroundGitHub}
        additionalClassName="btn--github"
      />
      <Button
        text="Egor Klyuchnyk"
        link="https://chekavo.artstation.com/"
        icon={IconCredit}
        backgroundImg={BackgroundCredit}
        additionalClassName="btn--credits"
      />
    </footer>
  );
};

export default Footer;
