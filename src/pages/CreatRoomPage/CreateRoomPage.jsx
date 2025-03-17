import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

function CreateRoomPage({ nickname }) {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState(["placeholder"]);
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
    socket.on("lobby_list", (users) => {
      let nicknames = users.map((user) => user.nickname);
      setUsers(nicknames);
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
      socket.emit("join_room", { room, nickname, id });
    }
    return () => {
      socket.off("create_room");
      socket.off("join_room");
    };
  }, [room]);

  return (
    <main>
      <p>You are: {nickname}</p>
      <h1>Create Room Page</h1>
      <h2>Room Code</h2>
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
