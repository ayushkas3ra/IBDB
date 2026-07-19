import React from "react";

function ChatSection() {
  return (
    <>
      <div class="ai-card">
        <div class="chat-box">
          <div class="message-row receiver">
            <div class="message-bubble">
              🤖: Hello! Welcome to IBDB, How can I help you today?
            </div>
          </div>
        </div>
        <div class="ai-card2">
          <form class="chat-form">
            <input class="ai_input" type="text" />
            <button class="send-btn" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
