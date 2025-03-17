import { useEffect, useState } from "react";

function GamePage({ nickname }) {
  const [gamePhase, setGamePhase] = useState(0);
  const [answers, setAnswers] = useState(["1", "2", "3", "4", "5", "6", "7"]);
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
        <div>
          <input type="text" />
          <button>SUBMIT</button>
        </div>
      );
      break;
    case 1:
      body = (
        <div>
          <ul>
            {shuffledAnswers.map((answer, index) => (
              <li key={index}>{answer}</li>
            ))}
          </ul>
        </div>
      );
      break;
    case 2:
      body = <div>Phase 2</div>;
      break;
    default:
      body = <div>Error loading game phase</div>;
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
