import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

function CreateRoomPage() {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const id = socket.id;

  const makeRoomCode = () => {
    const possibleCharacter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let roomCode = "";
    for (let i = 0; i < 4; i++) {
      roomCode += possibleCharacter.charAt(Math.random() * 26);
    }
    setRoom(roomCode);
  };

  useEffect(() => {
    makeRoomCode();
  }, []);

  useEffect(() => {
    if (room) {
      socket.emit("create_room", room);
      socket.emit("join_room", { room, id });
    }
  }, [room]);

  return (
    <main>
      <h1>Room Code</h1>
      <div className="">
        <p>{room}</p>
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
