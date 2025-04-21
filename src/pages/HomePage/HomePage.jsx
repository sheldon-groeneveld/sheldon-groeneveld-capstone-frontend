import { useNavigate } from "react-router-dom";
import "./HomePage.scss";
import { useEffect, useState } from "react";

function HomePage({ setRoom, nickname, setNickname }) {
  const navigate = useNavigate();
  const [charLimit, setCharLimit] = useState(12);
  const [errorState, setErrorState] = useState(false);

  const makeRoomCode = () => {
    if (nickname) {
      const possibleCharacter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let roomCode = "";
      for (let i = 0; i < 4; i++) {
        roomCode += possibleCharacter.charAt(Math.random() * 26);
      }
      setRoom(roomCode);
      navigate("/create-room");
    } else {
      setErrorState(true);
    }
  };

  useEffect(() => {
    setRoom("");
  }, []);

  return (
    <main className="home-page">
      <div className="home-page__container">
        <label className="home-page__span" htmlFor="nickname">
          NAME
        </label>
        <p className="home-page__span">{charLimit}</p>
      </div>
      <input
        className={
          "home-page__input " + (errorState ? "home-page__input-error" : "")
        }
        id="nickname"
        type="text"
        placeholder="ENTER YOUR NAME"
        maxLength={12}
        onChange={(event) => {
          setNickname(event.target.value.toUpperCase());
          setCharLimit(12 - event.target.value.length);
        }}
      />
      <button onClick={makeRoomCode}>CREATE ROOM</button>
      <button
        onClick={() => {
          nickname ? navigate("/join-room") : setErrorState(true);
        }}
      >
        JOIN ROOM
      </button>
    </main>
  );
}

export default HomePage;
