import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";
import { socket } from "../../socket";

// const socket = io.connect("http://localhost:8080");

function CreateRoomPage() {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");

  const makeRoomCode = () => {
    const possibleCharacter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let room = "";
    for (let i = 0; i < 4; i++) {
      room += possibleCharacter.charAt(Math.random() * 26);
    }
    setRoomCode(room);
  };

  useEffect(() => {
    makeRoomCode();
  }, []);

  useEffect(() => {
    if (roomCode) {
      socket.emit("create_room", roomCode);
      socket.emit("join_room", roomCode);
    }
  }, [roomCode]);

  return (
    <main>
      <h1>Room Code</h1>
      <div className="">
        <p>{roomCode}</p>
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
