import './Button.css';

const Button = ({ text, link, icon, backgroundImg, additionalClassName }) => {
  const buttonBody = (
    <>
      <img
        className="btn-image"
        src={backgroundImg}
        alt="Button Background"
        height="71"
        width="320"
      />
      <div className="btn-overlay">
        <div className={'btn-content'}>
          {icon && <img src={icon} alt="Icon" width="36" height="36" />}
          <h4>{text}</h4>
        </div>
      </div>
    </>
  );

  return (
    <>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className={`btn ${additionalClassName ?? ''}`}
        >
          {buttonBody}
        </a>
      ) : (
        <div className={`btn ${additionalClassName ?? ''}`}>{buttonBody}</div>
      )}
    </>
  );
};

export default Button;
