import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => {
          socket.connect();
          navigate("/create-room");
        }}
      >
        Create Room
      </button>
      <button
        onClick={() => {
          socket.connect();
          navigate("/join-room");
        }}
      >
        Join Room
      </button>
    </div>
  );
}

export default HomePage;
