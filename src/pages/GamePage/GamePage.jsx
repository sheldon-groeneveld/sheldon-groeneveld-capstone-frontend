import { useEffect, useState } from "react";
import "./GamePage.scss";
import { socket } from "../../socket";

function GamePage({ room, nickname }) {
  const [gamePhase, setGamePhase] = useState(0);
  const [payload, setPayload] = useState({
    author: nickname,
    answer: "",
    voters: [],
  });
  const [answers, setAnswers] = useState([]);
  const [vote, setVote] = useState();

  function handleSubmit() {
    socket.emit("send_answer", { room, payload });
    setGamePhase(1);
  }

  function handleConfirmVote() {
    socket.emit("send_vote", { room, nickname, vote });
    setGamePhase(1);
  }

  function handleReset() {
    socket.emit("reset_room", { room });
  }

  useEffect(() => {
    socket.on("recieve_answer", (answers) => {
      setAnswers(answers);
      setGamePhase(2);
    });
    socket.on("show_results", (answers) => {
      setAnswers(answers);
      setGamePhase(3);
    });
    socket.on("room_reset", (answers) => {
      setAnswers(answers);
      setGamePhase(0);
    });
    return () => {
      socket.off("recieve_answer");
      socket.off("show_results");
      socket.off("room_reset");
    };
  }, [socket]);

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
    case 1: // wait for everyone to complete phase
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
                  (vote === answer.answer ? "game-page__list-item--active" : "")
                }
                id={answer.answer}
                key={index}
                onClick={(event) => setVote(event.target.id)}
              >
                {answer.answer}
              </li>
            ))}
          </ul>
          <button onClick={handleConfirmVote}>Confirm</button>
        </div>
      );
      break;
    case 3: // reveal votes phase
      body = (
        <div className="game-page__container">
          <ul className="game-page__list">
            {answers.map((answer, index) => (
              <li
                className={"game-page__list-item active"}
                id={answer.answer}
                key={index}
              >
                <div>
                  <p>{answer.answer}</p>
                  <div className="game-page__wrapper">
                    {answer.voters.map((voter) => (
                      <p className="game-page__wrapper-item">{voter}</p>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handleReset}>Next Round!</button>
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
      <h1>{room}</h1>
      {body}
      <footer className="game-page__footer">
        <p>You are: {nickname}</p>
      </footer>
    </main>
  );
}

export default GamePage;
