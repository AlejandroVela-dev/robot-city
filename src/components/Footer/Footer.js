import './Footer.css';
import Button from '../../utils/Button/Button';
import BtnBgGitHub from '../../assets/images/btn-bg-github.webp';
import BtnBgCredit from '../../assets/images/btn-bg-credit.webp';
import IconCredit from '../../assets/images/icon-credit.webp';
import IconGitHub from '../../assets/images/icon-github.webp';

const Footer = () => {
  return (
    <footer>
      <Button
        text="GitHub"
        link="https://github.com/alejandrovela-dev"
        icon={IconGitHub}
        backgroundImg={BtnBgGitHub}
      />
      <Button
        text="Egor Klyuchnyk"
        link="https://chekavo.artstation.com/"
        icon={IconCredit}
        backgroundImg={BtnBgCredit}
        additionalClassName="btn-credits"
      />
    </footer>
  );
};

export default Footer;
