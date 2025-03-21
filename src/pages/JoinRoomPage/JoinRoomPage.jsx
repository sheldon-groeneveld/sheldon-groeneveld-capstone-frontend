import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import "./JoinRoomPage.scss";

import Lobby from "../../components/Lobby/Lobby";

function JoinRoomPage({ room, setRoom, nickname }) {
  const navigate = useNavigate();
  const [roomExists, setRoomExists] = useState(false);
  const [roomIsOpen, setRoomIsOpen] = useState(true);
  const [users, setUsers] = useState(["Failed to load users..."]);
  const [ready, setReady] = useState(false);
  const id = socket.id;

  const joinRoom = () => {
    if (roomExists && roomIsOpen && room.length === 4) {
      socket.emit("join_room", { room, nickname, id });
      setReady(true);
    }
  };

  useEffect(() => {
    if (room.length === 4) {
      socket.emit("check_room", room);
    }
    socket.on("room_verified", ({ roomExists, roomIsOpen }) => {
      setRoomExists(roomExists);
      setRoomIsOpen(roomIsOpen);
    });
    return () => {
      socket.off("room_verified");
    };
  }, [room]);

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

  if (!ready) {
    return (
      <main className="join-page">
        <div className="join-page__container">
          <h2 className="join-page__header">ROOM CODE </h2>
          {!roomExists && room.length === 4 ? (
            <span className="join-page__span">Room does not exist</span>
          ) : roomExists && !roomIsOpen && room.length === 4 ? (
            <span className="join-page__span">Room Closed</span>
          ) : roomExists && room.length === 4 ? (
            <span className="join-page__span">Found Room</span>
          ) : (
            ""
          )}
        </div>
        <input
          className="join-page__input"
          type="text"
          placeholder="Enter Room Code"
          maxLength={4}
          onChange={(event) => setRoom(event.target.value.toUpperCase())}
        />
        <button onClick={joinRoom}>Join Game</button>

        <footer className="join-page__footer">
          <p>You are: {nickname}</p>
        </footer>
      </main>
    );
  } else {
    return (
      <main className="join-page">
        <Lobby room={room} users={users} />
        <footer className="join-page__footer">
          <p>You are: {nickname}</p>
        </footer>
      </main>
    );
  }
}

export default JoinRoomPage;
