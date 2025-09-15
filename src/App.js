import React, { useState } from "react";
import "./App.css";


const dummyChats = [
  { id: 1, name: "Design Team", last: "Let's finalize the UI mockups", time: "10:30 AM" },
  { id: 2, name: "Dev Standup", last: "Bug fix deployed", time: "9:15 AM" },
  { id: 3, name: "Marketing", last: "Campaign launch tomorrow!", time: "Yesterday" },
];

const dummyMessages = [
  { from: "Alice", text: "Hey team, did you see the new design?" },
  { from: "Bob", text: "Yes, looks great!" },
  { from: "AI", text: "[🤖 AI Suggestion: You could ask if they need feedback on mobile version]" },
];

export default function App() {
  const [screen, setScreen] = useState("list");
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChatName, setNewChatName] = useState("");

  const goToChat = (chat) => {
    setSelectedChat(chat);
    setScreen("chat");
  };

  return (
    <div className="app-container">

      {screen === "list" && (
        <>
          <h1 className="app-title">💬 Smart Team Chat</h1>
          <div className="chat-list">
            {dummyChats.map((chat) => (
              <div
                key={chat.id}
                className="chat-card"
                onClick={() => goToChat(chat)}
              >
                <div className="chat-header">
                  <span className="chat-name">{chat.name}</span>
                  <span className="chat-time">{chat.time}</span>
                </div>
                <p className="chat-last">{chat.last}</p>
              </div>
            ))}
          </div>
          <button onClick={() => setScreen("new")} className="btn primary">
            ➕ New Chat
          </button>
        </>
      )}

      {screen === "chat" && selectedChat && (
        <>
          <button onClick={() => setScreen("list")} className="btn back">
            ← Back
          </button>
          <h2 className="chat-title">{selectedChat.name}</h2>

          <div className="messages">
            {dummyMessages.map((msg, i) => (
              <div
                key={i}
                className={`message-bubble ${msg.from === "AI" ? "ai" : "user"}`}
              >
                <strong>{msg.from}: </strong> {msg.text}
              </div>
            ))}
          </div>

          <div className="ai-section">
            <h3 className="ai-title">🤖 AI Tools</h3>

            <div className="ai-block">
              <button className="btn secondary">✨ Summarize Thread</button>
              <div className="placeholder">
                [AI Summary: The team agrees the design looks good. Next step: feedback on mobile version.]
              </div>
            </div>

            <div className="ai-block">
              <button className="btn secondary">💡 Smart Reply</button>
              <div className="placeholder">
                [Suggested Reply: “Looks great! Do you want me to check responsive behavior?”]
              </div>
            </div>
          </div>

          <div className="chat-input">
            <input type="text" placeholder="Type a message..." />
            <button className="btn primary small">Send</button>
          </div>
        </>
      )}

      {screen === "new" && (
        <>
          <button onClick={() => setScreen("list")} className="btn back">
            ← Back
          </button>
          <h2 className="chat-title">Start New Chat</h2>
          <input
            type="text"
            placeholder="Enter participant name"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            className="input"
          />
          <button className="btn primary">✅ Create Chat</button>

          <div className="ai-section">
            <h3 className="ai-title">🤖 AI Icebreaker</h3>
            <button className="btn secondary">💡 Generate Icebreaker</button>
            <div className="placeholder">
              {`Hi ${newChatName || "there"} 👋 Excited to kick off this project with you!`}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
