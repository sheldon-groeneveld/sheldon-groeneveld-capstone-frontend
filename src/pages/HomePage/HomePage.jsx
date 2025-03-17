import { useNavigate } from "react-router-dom";

function HomePage({ setNickname }) {
  const navigate = useNavigate();

  return (
    <div>
      <label htmlFor="nickname">
        NAME
        <input
          id="nickname"
          type="text"
          placeholder="ENTER YOUR NAME"
          onChange={(event) => setNickname(event.target.value)}
        />
      </label>
      <button
        onClick={() => {
          navigate("/create-room");
        }}
      >
        Create Room
      </button>
      <button
        onClick={() => {
          navigate("/join-room");
        }}
      >
        Join Room
      </button>
    </div>
  );
}

export default HomePage;
