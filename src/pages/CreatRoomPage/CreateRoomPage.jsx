import { useNavigate } from "react-router-dom";

function CreateRoomPage() {
  const navigate = useNavigate();
  return (
    <main>
      <h1>Room Code</h1>
      <div className="">
        <p>This is where the generated room code will be displayed</p>
      </div>

      <div>
        <h2>Players</h2>
        <ul>
          <li>Player 1</li>
          <li>Player 2</li>
          <li>Player 3</li>
          <li>Player 4</li>
        </ul>
      </div>

      <footer>
        <p>Is everyone in?</p>
        <button onClick={() => navigate("/:roomId")}>Start Game</button>
      </footer>
    </main>
  );
}

export default CreateRoomPage;
