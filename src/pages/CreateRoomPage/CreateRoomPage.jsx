import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import "./CreateRoomPage.scss";

import Lobby from "../../components/Lobby/Lobby";

function CreateRoomPage({ room, setRoom, nickname }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState(["placeholder"]);
  const id = socket.id;

  const startGame = (room) => {
    socket.emit("start_game", room);
    return () => socket.off("start_game");
  };

  useEffect(() => {
    socket.emit("create_room", room);
    socket.emit("join_room", { room, nickname, id });
    return () => {
      socket.off("create_room");
      socket.off("join_room");
    };
  }, []);

  useEffect(() => {
    socket.on("lobby_list", (users) => {
      console.log(users);
      setUsers(users);
    });
    socket.on("game_start", () => {
      navigate("/game-page");
    });
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
        <button onClick={() => startGame(room)}>PLAY</button>
      </div>

      <footer className="create-page__footer">
        <p>You are: {nickname}</p>
      </footer>
    </main>
  );
}

export default CreateRoomPage;
