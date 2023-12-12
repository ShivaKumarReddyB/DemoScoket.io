import { useState } from "react";

export const Chat = ({ socket, username, roomId }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const sendMessage = () => {
    if (currentMessage !== "") {
      const presentTime = new Date(Date.now());
      const messageInfo = {
        username,
        roomId,
        message: currentMessage,
        time: `${presentTime.getHours()} : ${presentTime.getMinutes()}`,
      };
      socket.emit("send_message", messageInfo);
    }
  };
  return (
    <>
      <div>
        <div className={"chat-header"}>
          <p>Live chat</p>
        </div>
        <div className={"chat-body"}></div>
        <div className={"chat-footer"}>
          <input
            type={"text"}
            placeholder={"enter message"}
            onChange={(event) => setCurrentMessage(event.target.value)}
          />
          <button onChange={sendMessage}>&#9658;</button>
        </div>
      </div>
    </>
  );
};
