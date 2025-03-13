import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/create-room")}>Create Room</button>
      <button onClick={() => navigate("/join-room")}>Join Room</button>
    </div>
  );
}

export default HomePage;
