import { useEffect, useState } from "react";
import "./GamePage.scss";
import { socket } from "../../socket";

function GamePage({ room, nickname }) {
  const [gamePhase, setGamePhase] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [users, setUsers] = useState(["placeholder"]);
  const sampleAnswers = [
    "Internation Police Cadets",
    "Itemized Pho Containers",
    "Incedintal Proton Collisions",
    "Idaho Potato Commission",
    "Ingenious Pets Club",
    "India Pharmacuticals Charter",
  ];

  function handleSubmit() {
    socket.emit("send_answer", { room, answer });
    setGamePhase(1);
    return () => socket.off("send_answer");
  }

  useEffect(() => {
    socket.on("recieve_answer", (answers) => setAnswers(answers));
    socket.on("users_get", (users) => setUsers(users));
    return () => socket.off("recieve_answer");
  }, [socket]);

  useEffect(() => {
    socket.emit("get_users", room);
    return () => socket.off("get_users");
  }, []);

  useEffect(() => {
    switch (gamePhase) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        socket.emit("request_answers", room);
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
            {answers.map((answer, index) => (
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
      <h1>Game Room</h1>
      {body}
      <button onClick={() => setGamePhase(0)}>Set Game Phase to 0</button>
      <button onClick={() => setGamePhase(1)}>Set Game Phase to 1</button>
      <button onClick={() => setGamePhase(2)}>Set Game Phase to 2</button>
      <footer className="game-page__footer">
        <p>You are: {nickname}</p>
      </footer>
    </main>
  );
}

export default GamePage;
