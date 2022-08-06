import './Button.css';

const Button = ({ text, link, icon, backgroundImg, additionalClassName }) => {
  return (
    <div
      className="btn"
      onClick={() => link && window.open(link)}
      style={{
        backgroundImage: `url(${backgroundImg})`,
        cursor: link && 'pointer',
      }}
    >
      <img className="btn-image" src={backgroundImg} alt="bg" />
      <div className="btn-overlay">
        <div
          className={`btn-content ${
            additionalClassName ? additionalClassName : ''
          }`}
        >
          {icon && <img src={icon} alt={text}></img>}
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Button;
