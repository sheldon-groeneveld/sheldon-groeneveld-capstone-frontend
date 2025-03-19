import { useNavigate } from "react-router-dom";
import "./HomePage.scss";
import { useState } from "react";

function HomePage({ setNickname }) {
  const navigate = useNavigate();
  const [charLimit, setCharLimit] = useState(12);

  return (
    <main className="home-page">
      <div className="home-page__container">
        <label className="home-page__span" htmlFor="nickname">
          NAME
        </label>
        <p className="home-page__span">{charLimit}</p>
      </div>
      <input
        className="home-page__input"
        id="nickname"
        type="text"
        placeholder="ENTER YOUR NAME"
        maxLength={12}
        onChange={(event) => {
          setNickname(event.target.value);
          setCharLimit(12 - event.target.value.length);
        }}
      />
      <button
        onClick={() => {
          navigate("/create-room");
        }}
      >
        CREATE ROOM
      </button>
      <button
        onClick={() => {
          navigate("/join-room");
        }}
      >
        JOIN ROOM
      </button>
    </main>
  );
}

export default HomePage;
