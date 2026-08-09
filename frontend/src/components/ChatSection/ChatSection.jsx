import React, { useState } from 'react'
import './ChatSection.css'
import { askBook } from '@/api/books'
import { useNavigate } from 'react-router-dom'

function ChatSection({ isbn13 }) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello! Welcome to IBDB. How can I help you today?',
    },
  ])

  const [question, setQuestion] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!question.trim()) return

    const userQuestion = question

    const token = localStorage.getItem('access')
    if (!token) {
      alert('To chat with AI Librarian, you need to login first...')
      navigate('/signin')
      return
    }

    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: userQuestion,
      },
      {
        sender: 'ai',
        text: 'Thinking...',
      },
    ])

    setQuestion('')

    try {
      const data = await askBook(isbn13, userQuestion)
      setMessages((prev) => {
        const updated = [...prev]
        updated.pop() // Remove Thinking...
        updated.push({
          sender: 'ai',
          text: data.answer,
        })
        return updated
      })
    } catch (error) {
      console.error(error)

      setMessages((prev) => {
        const updated = [...prev]
        updated.pop()
        updated.push({
          sender: 'ai',
          text: 'Sorry, an error occurred while contacting the AI.',
        })
        return updated
      })
    }
  }

  return (
    <div className="ai-card">
      <div className="heading">AI Librarian</div>

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.sender === 'user'
                ? 'message-row-sender'
                : 'message-row-receiver'
            }
          >
            <div
              className={
                msg.sender === 'user'
                  ? 'message-bubble-sender'
                  : 'message-bubble-receiver'
              }
            >
              {msg.sender === 'user' ? '👤 ' : '🤖 '}
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
  )
}

export default ChatSection
