import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

import Lobby from "../../components/Lobby/Lobby";

function CreateRoomPage({ nickname }) {
  const navigate = useNavigate();
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState(["placeholder"]);
  const [test, setTest] = useState(false);
  const id = socket.id;

  const makeRoomCode = () => {
    const possibleCharacter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let roomCode = "";
    for (let i = 0; i < 4; i++) {
      roomCode += possibleCharacter.charAt(Math.random() * 26);
    }
    setRoom(roomCode);
  };

  const startGame = (room) => {
    socket.emit("start_game", room);
    return () => socket.off("start_game");
  };

  useEffect(() => {
    socket.on("lobby_list", (users) => {
      let nicknames = users.map((user) => user.nickname);
      setUsers(nicknames);
    });
    socket.on("game_start", () => {
      navigate("/game-page");
    });
    return () => {
      socket.off("lobby_list");
      socket.off("game_start");
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
      <h1>Create Room Page</h1>
      <Lobby room={room} users={users} />

      <footer>
        <p>Is everyone in?</p>
        <button onClick={() => startGame(room)}>Start Game</button>
        <p>You are: {nickname}</p>
      </footer>
    </main>
  );
}

export default CreateRoomPage;
