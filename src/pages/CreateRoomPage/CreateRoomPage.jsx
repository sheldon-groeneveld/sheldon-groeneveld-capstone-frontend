import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import "./CreateRoomPage.scss";

import Lobby from "../../components/Lobby/Lobby";

function CreateRoomPage({ room, nickname }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState(["Failed to load users..."]);
  const id = socket.id;

  const startGame = () => {
    socket.emit("start_game", room);
  };

  useEffect(() => {
    socket.emit("create_room", room);
    socket.emit("join_room", { room, nickname, id });
  }, []);

  useEffect(() => {
    socket.on("lobby_list", (users) => {
      setUsers(users);
    });
    socket.on("game_start", () => navigate("/game-page"));
    return () => {
      socket.off("lobby_list");
      socket.off("game_start");
    };
  }, [socket]);

  return (
    <main className="create-page">
      <Lobby room={room} users={users} />
      <div>
        <p>Is everyone in?</p>
        <button onClick={startGame}>PLAY</button>
      </div>

      <footer className="create-page__footer">
        <p>You are: {nickname}</p>
      </footer>
    </main>
  );
}

export default CreateRoomPage;
