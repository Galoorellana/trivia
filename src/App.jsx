
import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './Componets/Header/Header';
import Home from './Componets/Home/Home';
import AnswerButton from './Componets/AnswerButton/AnswerButton';
import Leaderboard from './Componets/LeaderBoard/LeaderBoard';

function App() {
  const [nickname, setNickname] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (isGameStarted) {
      fetch(`https://opentdb.com/api.php?amount=10&category=12&easy=${difficulty}&type=multiple`)
        .then((response) => response.json())
        .then((data) => setQuestions(data.results));
    }
  }, [isGameStarted, difficulty]);

  const handleStartGame = () => {
    if (!nickname) {
      alert('Please enter your nickname!');
      return;
    }
    setIsGameStarted(true);
  };

  const handleAnswer = (selectedAnswer) => {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;
    if (selectedAnswer === correctAnswer) {
      alert('Correct!');
      setScore(score + 1);
    } else {
      alert(`Wrong! The correct answer was: ${correctAnswer}`);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const handleRestart = () => {
    
    const storedScores = JSON.parse(localStorage.getItem('scores')) || [];
    storedScores.push({ nickname, score });
    localStorage.setItem('scores', JSON.stringify(storedScores));

    setNickname('');
    setDifficulty('medium');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsGameStarted(false);
    setIsGameOver(false);
  };

  if (!isGameStarted) {
    return (
      <div className="container">
        <Header nickname={nickname} />
        <Home 
          nickname={nickname} 
          setNickname={setNickname} 
          difficulty={difficulty} 
          setDifficulty={setDifficulty} 
          handleStartGame={handleStartGame} 
         
        />
        <Leaderboard /> 
      </div>
    );
  }

  if (isGameOver) {
    return (
      <div className="container">
        <Header nickname={nickname} />
        <main className="main">
          <h1>Game Over!</h1>
          <p>You answered {score} out of {questions.length} questions correctly!</p>
          <button className="button" onClick={handleRestart}>Play Again</button>
          <Leaderboard/>
        </main>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container">
        <Header nickname={nickname} />
        <main className="main">
          <p>Loading questions...</p>
        </main>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const allAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5);
  
  function decodeHtmlEntities(str) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = str;
    return textArea.value;
  }

  return (
    <div className="container">
      <Header nickname={nickname} />
      <main className="main">
        <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <p>{decodeHtmlEntities(currentQuestion.question)}</p>
        <div className="answers">
          {allAnswers.map((answer, index) => (
            <AnswerButton key={index} answer={answer} onClick={() => handleAnswer(answer)} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;