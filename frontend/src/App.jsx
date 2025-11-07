import React from "react";
import ChatBox from "./components/ChatBox";
import ImageUpload from "./components/ImageUpload";

function App() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Secure AI Chat</h1>
      <ImageUpload />
      <ChatBox />
    </div>
  );
}
export default App;
