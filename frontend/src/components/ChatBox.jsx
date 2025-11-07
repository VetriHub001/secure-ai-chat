import React, { useState } from "react";
import axios from "axios";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const formData = new FormData();
    formData.append("prompt", input);
    const res = await axios.post("http://localhost:8000/chat/", formData);
    setMessages([...messages, { sender: "user", text: input },
                 { sender: "ai", text: res.data.response }]);
    setInput("");
  };

  return (
    <div className="p-4">
      <div className="border p-2 h-80 overflow-y-auto bg-gray-50 rounded">
        {messages.map((m, i) => (
          <div key={i} className={m.sender === "user" ? "text-right" : "text-left"}>
            <p className={m.sender === "user" ? "text-blue-600" : "text-green-600"}>{m.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input className="flex-1 border p-2 rounded" value={input} onChange={e => setInput(e.target.value)} />
        <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
