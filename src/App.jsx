import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "./socket";
import "./App.css";

import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import CreateRoomPage from "./pages/CreatRoomPage/CreateRoomPage";
import JoinRoomPage from "./pages/JoinRoomPage/JoinRoomPage";
import GamePage from "./pages/GamePage/GamePage";

function App() {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    socket.connect();
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage setNickname={setNickname} />} />
        <Route
          path="/create-room"
          element={<CreateRoomPage nickname={nickname} />}
        />
        <Route
          path="/join-room"
          element={<JoinRoomPage nickname={nickname} />}
        />
        <Route path="/game-page" element={<GamePage nickname={nickname} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
