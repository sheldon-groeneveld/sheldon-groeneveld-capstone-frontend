import { useEffect, useState } from "react";
import "./GamePage.scss";
import { socket } from "../../socket";

function GamePage({ room, nickname }) {
  const [gamePhase, setGamePhase] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const sampleAnswers = [
    "Internation Police Cadets",
    "Itemized Pho Containers",
    "Incedintal Proton Collisions",
    "Idaho Potato Commission",
    "Ingenious Pets Club",
    "India Pharmacuticals Charter",
  ];
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

  function handleSubmit() {
    socket.emit("send_answer", { room, answer });
    setGamePhase(1);
  }

  useEffect(() => {
    socket.on("recieve_answer", (answers) => {
      console.log(answers);
      setAnswers(answers);
    });
    return () => socket.off("recieve_answer");
  }, [socket]);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  useEffect(() => {
    switch (gamePhase) {
      case 0:
        setAnswers([]);
        break;
      case 1:
        break;
      case 2:
        // setShuffledAnswers(shuffle(answers));
        setShuffledAnswers(shuffle(sampleAnswers));
        break;
      case 3:
        break;
      default:
        break;
    }
  }, [gamePhase]);

  let body;
  switch (gamePhase) {
    case 0:
      body = (
        <div className="game-page__container">
          <input
            type="text"
            onChange={(event) => setAnswer(event.target.value)}
          />
          <button onClick={handleSubmit}>SUBMIT</button>
        </div>
      );
      break;
    case 1:
      body = (
        <div className="game-page__container">Waiting for other players...</div>
      );
      break;
    case 2:
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
      <button onClick={() => setGamePhase(2)}>Set Game Phase to 2</button>
    </main>
  );
}

export default GamePage;
