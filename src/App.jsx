import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import CreateRoomPage from "./pages/CreatRoomPage/CreateRoomPage";
import JoinRoomPage from "./pages/JoinRoomPage/JoinRoomPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-room" element={<CreateRoomPage />} />
        <Route path="/join-room" element={<JoinRoomPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
