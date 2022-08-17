import './Button.css';

const Button = ({ text, link, icon, backgroundImg, additionalClassName }) => {
  const btnStyle = {
    cursor: link && 'pointer',
  };

  return (
    <div
      className={`btn ${additionalClassName ?? ''}`}
      onClick={() => link && window.open(link)}
      style={btnStyle}
    >
      <img className="btn-image" src={backgroundImg} alt="bg" />
      <div className="btn-overlay">
        <div className={'btn-content'}>
          {icon && <img src={icon} alt={text}></img>}
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Button;
