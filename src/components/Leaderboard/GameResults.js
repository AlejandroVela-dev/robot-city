import { useState } from 'react';

const GameResults = ({ isTopScore, submitScore }) => {
  const [isSubmitFormVisible, setIsSubmitFormVisible] = useState(true);

  const handleSubmit = () => {
    setIsSubmitFormVisible(false);
    submitScore();
  };

  return (
    <div className="game-results">
      {isTopScore ? (
        <>
          <p>Wow! Now that's an eagle eye!</p>
          {isSubmitFormVisible ? (
            <>
              <p>May I record that score in my database?</p>
              <button className="btn--submit" onClick={handleSubmit}>
                Ok
              </button>
            </>
          ) : (
            <p>Thank you so much!</p>
          )}
        </>
      ) : (
        <>
          <p>That took a while...</p>
          <p>But you did it!</p>
        </>
      )}
    </div>
  );
};

export default GameResults;
