const ScoreForm = ({
  isPlayerScoreTopScore,
  handleFormSubmit,
  setShowScoreForm,
}) => {
  return (
    <div className="score-form">
      {isPlayerScoreTopScore ? (
        <>
          <p>Wow! Now that's an eagle eye!</p>
          <p>May I save your score in my database?</p>
          <div className="score-form__submit">
            <button onClick={() => handleFormSubmit()}>Ok</button>
            <button onClick={() => setShowScoreForm(false)}>No</button>
          </div>
        </>
      ) : (
        <>
          <p>That took you a while... </p>
          <p>But you found them! Thank you so much!</p>
        </>
      )}
    </div>
  );
};

export default ScoreForm;
