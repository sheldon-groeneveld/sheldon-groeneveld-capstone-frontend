// This is a placeholder page for client side room functionality
// This page will be deleted once the functionailty needed is implented on the real pages

import { useState, useEffect } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8080");

function PlaceholderPage() {
  const [message, setMessage] = useState("");
  const [recievedMessage, setRecievedMessage] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      setRecievedMessage(data.message);
    });
  }, [socket]);
  return (
    <section>
      <div>
        <input
          placeholder="Room ID..."
          onChange={(event) => {
            setRoom(event.target.value);
          }}
        />
        <button onClick={joinRoom}>Join Room</button>
      </div>
      <div>
        <input
          placeholder="Message..."
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>Send Message</button>
        <h1>Message: </h1>
        {recievedMessage}
      </div>
    </section>
  );
}

export default PlaceholderPage;
