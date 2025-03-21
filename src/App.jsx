import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import "./App.scss";

import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import CreateRoomPage from "./pages/CreateRoomPage/CreateRoomPage";
import JoinRoomPage from "./pages/JoinRoomPage/JoinRoomPage";
import GamePage from "./pages/GamePage/GamePage";

function App() {
  const [nickname, setNickname] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.connect();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage setRoom={setRoom} setNickname={setNickname} />}
        />
        <Route
          path="/create-room"
          element={<CreateRoomPage room={room} nickname={nickname} />}
        />
        <Route
          path="/join-room"
          element={
            <JoinRoomPage room={room} setRoom={setRoom} nickname={nickname} />
          }
        />
        <Route
          path="/game-page"
          element={<GamePage room={room} nickname={nickname} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
