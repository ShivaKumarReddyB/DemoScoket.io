import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import { Chat } from "./Chat";

const socket = io.connect("http://localhost:8000/");

function App() {
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleJoinRoom = () => {
    console.log({ userName, roomId });
    if (userName !== "" && roomId !== "") {
      // this is sender which send the information
      socket.emit("join-room", roomId);
    }
  };

  return (
    <div className="App">
      <h1> Socket.ios</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor={"user-name"}>
          User Name
          <input
            type={"text"}
            placeholder={"Enter you name "}
            id={"user-name"}
            onChange={(event) => setUserName(event.target.value)}
          />
        </label>
        <label htmlFor={"room-id"}>
          Room Number
          <input
            type={"text"}
            placeholder={"Enter room id"}
            id={"room-id"}
            onChange={(event) => setRoomId(event.target.value)}
          />
        </label>
        <label>
          <input
            type={"button"}
            onClick={handleJoinRoom}
            value={"Join Room"}
            style={{ width: 100 }}
          />
        </label>
      </div>
      <Chat username={userName} socket={socket} roomId={roomId} />
    </div>
  );
}

export default App;
