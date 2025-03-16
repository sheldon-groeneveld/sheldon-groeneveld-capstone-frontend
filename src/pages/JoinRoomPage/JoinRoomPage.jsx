import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

function JoinRoomPage() {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [roomExists, setRoomExists] = useState(false);
  const id = socket.id;

  const joinRoom = () => {
    if (room.length === 4) {
      socket.emit("join_room", room);
      // navigate("/game-page");
    }
  };

  useEffect(() => {
    if (room.length === 4) {
      socket.emit("check_room", { room, id });
    }
    socket.on("room_verified", (roomExists) => setRoomExists(roomExists));
  }, [room]);

  return (
    <div>
      <h1>Join Room Page </h1>
      <input
        type="text"
        placeholder="Enter Room Code"
        maxLength={4}
        onChange={(event) => setRoom(event.target.value)}
      />
      <button onClick={joinRoom}>Join Game</button>
      {!roomExists && room.length === 4 ? <span>Room does not exist</span> : ""}
    </div>
  );
}

export default JoinRoomPage;
