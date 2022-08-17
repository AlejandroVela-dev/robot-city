import './Button.css';

const Button = ({ text, link, icon, backgroundImg, additionalClassName }) => {
  const buttonBody = (
    <>
      <img className="btn-image" src={backgroundImg} alt="bg" />
      <div className="btn-overlay">
        <div className={'btn-content'}>
          {icon && <img src={icon} alt={text}></img>}
          <p>{text}</p>
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
