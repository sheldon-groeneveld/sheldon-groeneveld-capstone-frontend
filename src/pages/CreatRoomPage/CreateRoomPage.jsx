import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

function CreateRoomPage() {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState([]);
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
    socket.on("lobby_list", (id) => {
      console.log(id);
      setUsers((users) => [...users, id]);
    });
    return () => {
      socket.off("lobby_list");
    };
  }, [socket]);

  useEffect(() => {
    makeRoomCode();
  }, []);

  useEffect(() => {
    if (room) {
      socket.emit("create_room", room);
      socket.emit("join_room", { room, id });
    }
    return () => {
      socket.off("create_room");
      socket.off("join_room");
    };
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
          {users.map((user, id) => (
            <li key={id}>{user}</li>
          ))}
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
