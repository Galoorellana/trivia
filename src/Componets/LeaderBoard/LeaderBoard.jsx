import React, { useEffect, useState } from 'react';
import './LeaderBoard.css';
const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem('scores')) || [];
    
    const topScores = storedScores.sort((a, b) => b.score - a.score).slice(0, 5);
    setScores(topScores);
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Nickname</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((player, index) => (
            <tr key={index}>
              <td>{player.nickname}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;