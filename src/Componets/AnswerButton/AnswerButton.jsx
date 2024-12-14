import React from 'react';

const AnswerButton = ({ answer, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {answer}
    </button>
  );
};

export default AnswerButton;