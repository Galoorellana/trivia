import React from 'react';

const Home = ({ nickname, setNickname, difficulty, setDifficulty, handleStartGame }) => {
  return (
    <main className="main">
      <h1>Welcome to the Trivia Game!</h1>
      <input
        className="input"
        type="text"
        placeholder="Enter your nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <select className="select" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button className="button" onClick={handleStartGame}>Start Game</button>
    </main>
  );
};

export default Home;