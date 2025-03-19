import { useEffect, useState } from "react";
import "./GamePage.scss";

function GamePage({ nickname }) {
  const [gamePhase, setGamePhase] = useState(0);
  const [answers, setAnswers] = useState([
    "Internation Police Cadets",
    "Itemized Pho Containers",
    "Incedintal Proton Collisions",
    "Idaho Potato Commission",
    "Ingenious Pets Club",
    "India Pharmacuticals Charter",
  ]);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  function shuffle(array) {
    let tempArray = [...array];
    let currentIndex = tempArray.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [tempArray[currentIndex], tempArray[randomIndex]] = [
        tempArray[randomIndex],
        tempArray[currentIndex],
      ];
    }
    return tempArray;
  }

  useEffect(() => {
    if (gamePhase === 1) {
      setShuffledAnswers(shuffle(answers));
    }
  }, [gamePhase]);

  let body;
  switch (gamePhase) {
    case 0:
      body = (
        <div className="game-page__container">
          <input type="text" />
          <button>SUBMIT</button>
        </div>
      );
      break;
    case 1:
      body = (
        <div className="game-page__container">
          <ul className="game-page__list">
            {shuffledAnswers.map((answer, index) => (
              <li className="game-page__list-item" key={index}>
                {answer}
              </li>
            ))}
          </ul>
        </div>
      );
      break;
    case 2:
      body = <div className="game-page__container">Phase 2</div>;
      break;
    default:
      body = (
        <div className="game-page__container">Error loading game phase</div>
      );
      break;
  }
  return (
    <main>
      <p>You are: {nickname}</p>
      <h1>Game Room</h1>
      {body}
      <button onClick={() => setGamePhase(0)}>Set Game Phase to 0</button>
      <button onClick={() => setGamePhase(1)}>Set Game Phase to 1</button>
    </main>
  );
}

export default GamePage;
