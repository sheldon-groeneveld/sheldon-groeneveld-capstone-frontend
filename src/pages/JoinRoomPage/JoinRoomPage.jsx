import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

function JoinRoomPage({ nickname }) {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [roomExists, setRoomExists] = useState(false);
  const id = socket.id;

  const joinRoom = () => {
    if (roomExists && room.length === 4) {
      socket.emit("join_room", { room, nickname, id });
      navigate("/game-page");
    }
    return () => socket.off("join_room");
  };

  useEffect(() => {
    if (room.length === 4) {
      socket.emit("check_room", room);
    }
    socket.on("room_verified", (roomExists) => setRoomExists(roomExists));
    return () => {
      socket.off("check_room");
      socket.off("room_verified");
    };
  }, [room]);

  return (
    <div>
      <p>You are: {nickname}</p>
      <h1>Join Room Page </h1>
      <input
        type="text"
        placeholder="Enter Room Code"
        maxLength={4}
        onChange={(event) => setRoom(event.target.value)}
      />
      <button onClick={joinRoom}>Join Game</button>
      {!roomExists && room.length === 4 ? <span>Room does not exist</span> : ""}
      {roomExists && room.length === 4 ? <span>Found Room</span> : ""}
    </div>
  );
}

export default JoinRoomPage;
