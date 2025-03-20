import { useEffect, useState } from "react";
import "./GamePage.scss";
import { socket } from "../../socket";

function GamePage({ room, nickname }) {
  const [gamePhase, setGamePhase] = useState(0);
  const [payload, setPayload] = useState({
    author: nickname,
    answer: "",
    voters: "",
  });
  const [answers, setAnswers] = useState([]);
  const [isActive, setIsActive] = useState();
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
    console.log(payload);
    socket.emit("send_answer", { room, payload });
    setGamePhase(1);
    return () => socket.off("send_answer");
  }

  useEffect(() => {
    socket.on("recieve_answer", (answers) => setAnswers(answers));
    socket.on("users_get", (users) => setUsers(users));
    return () => {
      socket.off("recieve_answer");
      socket.off("users_get");
    };
  }, [socket]);

  useEffect(() => {
    console.log(answers.map((answer) => answer.answer));
  }, [answers]);

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
    case 0: // submit answers phase
      body = (
        <div className="game-page__container">
          <input
            type="text"
            onChange={(event) =>
              setPayload({ ...payload, answer: event.target.value })
            }
          />
          <button onClick={handleSubmit}>SUBMIT</button>
        </div>
      );
      break;
    case 1: // wait for everyone to answer phase
      body = (
        <div className="game-page__container">Waiting for other players...</div>
      );
      break;
    case 2: // vote on answers phase
      body = (
        <div className="game-page__container">
          <ul className="game-page__list">
            {answers.map((answer, index) => (
              <li
                className={
                  "game-page__list-item " +
                  (isActive === answer.answer
                    ? "game-page__list-item--active"
                    : "")
                }
                id={answer.answer}
                key={index}
                onClick={(event) => setIsActive(event.target.id)}
              >
                {answer.answer}
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
