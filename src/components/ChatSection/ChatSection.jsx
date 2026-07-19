import React, { useState } from "react";
import "./ChatSection.css";

function ChatSection({ bookTitle }) {
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! Welcome to IBDB. How can I help you today?",
    },
  ]);

  const [question, setQuestion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    const userQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userQuestion,
      },
      {
        sender: "ai",
        text: "Thinking...",
      },
    ]);

    setQuestion("");

    try {
      const response = await fetch("http://127.0.0.1:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userQuestion,
          bookTitle: bookTitle,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop(); // Remove Thinking...
        updated.push({
          sender: "ai",
          text: data.answer,
        });
        return updated;
      });
    } catch (error) {
      console.error(error);

      setMessages((prev) => {
        const updated = [...prev];
        updated.pop();
        updated.push({
          sender: "ai",
          text: "Sorry, an error occurred while contacting the AI.",
        });
        return updated;
      });
    }
  };

  return (
    <div className="ai-card">
      <h2>AI Librarian</h2>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === "user"
                ? "message-row-sender"
                : "message-row-receiver"
            }
          >
            <div
              className={
                msg.sender === "user"
                  ? "message-bubble-sender"
                  : "message-bubble-receiver"
              }
            >
              {msg.sender === "user" ? "👤 " : "🤖 "}
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="ai-card2">
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            className="ai-input"
            type="text"
            placeholder="Enter your query..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />

          <button className="send-btn" type="submit">
            Ask
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatSection;
