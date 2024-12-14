

export function Header({ nickname }) {
    return (
      <header className="header">
        <h1>Trivia Game</h1>
        <p>Topic: Music</p>
        {nickname && <p>Player: {nickname}</p>}
      </header>
    );
    
    return
        <div className="header">
            <Header nickname={nickname} />
        </div>
  }
export default Header 

