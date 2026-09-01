import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { getBook, getSimilarBooks } from '../../api/books'
import { BOOK_PLACEHOLDER } from '../../constants/images'
import { askBook } from '../../api/books'
import { useNavigate } from 'react-router-dom'
import Typewriter from 'typewriter-effect'
import './AboutBook.css'

export default function AboutBook() {
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
      alert('To use chatbot, you need to login first...')
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

  const { isbn13 } = useParams()
  const [book, setBook] = useState(null)
  const [similarBooks, setSimilarBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAIChat, setShowAIChat] = useState(false)
  const [showSimilarBooks, setShowSimilarBooks] = useState(true)
  const [showDesription, setShowDescription] = useState(true)

  useEffect(() => {
    async function fetchBook() {
      try {
        // Synchronize both requests
        const [bookData, similarData] = await Promise.all([
          getBook(isbn13),
          getSimilarBooks(isbn13),
        ])
        setBook(bookData)
        setSimilarBooks(similarData)
      } catch (error) {
        console.error(error)
      } finally {
        window.scrollTo(0, 0)
        setLoading(false)
      }
    }
    fetchBook()
  }, [isbn13])

  if (loading) {
    return (
      <main className="book-main-loading">
        <ClipLoader color="#bbbb" loading={loading} size={50} />
      </main>
    )
  }

  return (
    <div className={`aboutBook-main ${showAIChat ? 'ai-chat-open' : ''}`}>
      <title>IBDB - Book Details</title>
      <div className="aboutBook-container1">
        <div className="aboutBook-bookSection">
          <div className="aboutBook-bookCard">
            <div className="aboutBook-bookCoverImage">
              <img
                src={
                  book.image ||
                  'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'
                }
                alt={book.title}
                className="book-cover"
                loading="lazy"
              />
            </div>
            <div>
              <div className="aboutBook-bookTitle">{book.title}</div>
              <div className="aboutBook-bookAuthor">{book.author}</div>
              <div className="aboutBook-bookRating"> ⭐{book.rating}</div>
              <div className="aboutBook-bookRatingsCount">
                {book.rating_count} votes
              </div>
              <div className="aboutBook-bookDescription">
                {book.description}
              </div>
              <div>
                <button className="aboutBook-addToListBtn">
                  <span className="aboutBook-addToListSVG">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path d="M128 128C128 92.7 156.7 64 192 64L448 64C483.3 64 512 92.7 512 128L512 545.1C512 570.7 483.5 585.9 462.2 571.7L320 476.8L177.8 571.7C156.5 585.9 128 570.6 128 545.1L128 128zM192 112C183.2 112 176 119.2 176 128L176 515.2L293.4 437C309.5 426.3 330.5 426.3 346.6 437L464 515.2L464 128C464 119.2 456.8 112 448 112L192 112z" />
                    </svg>
                  </span>
                  Add to list
                </button>
                <button className="aboutBook-rateThisBookBtn">
                  <span className="aboutBook-rateThisBookSVG">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path d="M320.1 32C329.1 32 337.4 37.1 341.5 45.1L415 189.3L574.9 214.7C583.8 216.1 591.2 222.4 594 231C596.8 239.6 594.5 249 588.2 255.4L473.7 369.9L499 529.8C500.4 538.7 496.7 547.7 489.4 553C482.1 558.3 472.4 559.1 464.4 555L320.1 481.6L175.8 555C167.8 559.1 158.1 558.3 150.8 553C143.5 547.7 139.8 538.8 141.2 529.8L166.4 369.9L52 255.4C45.6 249 43.4 239.6 46.2 231C49 222.4 56.3 216.1 65.3 214.7L225.2 189.3L298.8 45.1C302.9 37.1 311.2 32 320.2 32zM320.1 108.8L262.3 222C258.8 228.8 252.3 233.6 244.7 234.8L119.2 254.8L209 344.7C214.4 350.1 216.9 357.8 215.7 365.4L195.9 490.9L309.2 433.3C316 429.8 324.1 429.8 331 433.3L444.3 490.9L424.5 365.4C423.3 357.8 425.8 350.1 431.2 344.7L521 254.8L395.5 234.8C387.9 233.6 381.4 228.8 377.9 222L320.1 108.8z" />
                    </svg>
                  </span>
                  Rate this book
                </button>
              </div>
            </div>
          </div>
          <div className="aboutBook-aiDescription">
            <div className="aboutBook-aiDescription-title">
              <span className="aboutBook-aiDescription-aiOverviewSVG">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M480 576L192 576C139 576 96 533 96 480L96 160C96 107 139 64 192 64L496 64C522.5 64 544 85.5 544 112L544 400C544 420.9 530.6 438.7 512 445.3L512 512C529.7 512 544 526.3 544 544C544 561.7 529.7 576 512 576L480 576zM192 448C174.3 448 160 462.3 160 480C160 497.7 174.3 512 192 512L448 512L448 448L192 448zM224 216C224 229.3 234.7 240 248 240L424 240C437.3 240 448 229.3 448 216C448 202.7 437.3 192 424 192L248 192C234.7 192 224 202.7 224 216zM248 288C234.7 288 224 298.7 224 312C224 325.3 234.7 336 248 336L424 336C437.3 336 448 325.3 448 312C448 298.7 437.3 288 424 288L248 288z" />
                </svg>
              </span>
              Description
              <button
                className="aboutBook-viewBtn"
                onClick={() => setShowDescription(!showDesription)}
              >
                <span className="aboutBook-viewBtnSVG">
                  {showDesription ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path d="M300.3 440.8C312.9 451 331.4 450.3 343.1 438.6L471.1 310.6C480.3 301.4 483 287.7 478 275.7C473 263.7 461.4 256 448.5 256L192.5 256C179.6 256 167.9 263.8 162.9 275.8C157.9 287.8 160.7 301.5 169.9 310.6L297.9 438.6L300.3 440.8z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 640"
                    >
                      <path d="M300.3 199.2C312.9 188.9 331.4 189.7 343.1 201.4L471.1 329.4C480.3 338.6 483 352.3 478 364.3C473 376.3 461.4 384 448.5 384L192.5 384C179.6 384 167.9 376.2 162.9 364.2C157.9 352.2 160.7 338.5 169.9 329.4L297.9 201.4L300.3 199.2z" />
                    </svg>
                  )}
                </span>
              </button>
            </div>
            <div className="aboutBook-aiDescription-description">
              {showDesription && (
                <Typewriter
                  key={book.description}
                  options={{
                    delay: 1,
                    cursor: '▎',
                  }}
                  onInit={(typewriter) => {
                    typewriter.typeString(book.description).start()
                  }}
                />
              )}
            </div>
            <div className="aboutBook-aiDescription-subtitle">
              Want to know more?{' '}
              <button
                className="toggleAIBtn"
                onClick={() => {
                  setShowAIChat(true)
                }}
              >
                Ask IBDB AI
                <span className="aboutBook-toggleAIBtnSVG">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M598.6 342.6C611.1 330.1 611.1 309.8 598.6 297.3L470.6 169.3C458.1 156.8 437.8 156.8 425.3 169.3C412.8 181.8 412.8 202.1 425.3 214.6L498.7 288L64 288C46.3 288 32 302.3 32 320C32 337.7 46.3 352 64 352L498.7 352L425.3 425.4C412.8 437.9 412.8 458.2 425.3 470.7C437.8 483.2 458.1 483.2 470.6 470.7L598.6 342.7z" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="aboutBook-similarBooks">
          <div className="aboutBook-similarBooks-title">
            Similar Books
            <button
              className="aboutBook-viewBtn"
              onClick={() => setShowSimilarBooks(!showSimilarBooks)}
            >
              <span className="aboutBook-viewBtnSVG">
                {showSimilarBooks ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M300.3 440.8C312.9 451 331.4 450.3 343.1 438.6L471.1 310.6C480.3 301.4 483 287.7 478 275.7C473 263.7 461.4 256 448.5 256L192.5 256C179.6 256 167.9 263.8 162.9 275.8C157.9 287.8 160.7 301.5 169.9 310.6L297.9 438.6L300.3 440.8z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M300.3 199.2C312.9 188.9 331.4 189.7 343.1 201.4L471.1 329.4C480.3 338.6 483 352.3 478 364.3C473 376.3 461.4 384 448.5 384L192.5 384C179.6 384 167.9 376.2 162.9 364.2C157.9 352.2 160.7 338.5 169.9 329.4L297.9 201.4L300.3 199.2z" />
                  </svg>
                )}
              </span>
            </button>
          </div>
          {showSimilarBooks && (
            <div className="aboutBook-similarBooksList">
              {similarBooks.slice(0, 10).map((similarBook) => (
                <Link
                  className="aboutBook-bookCard"
                  key={similarBook.isbn13}
                  to={`/book/${similarBook.isbn13}`}
                >
                  <div className="aboutBook-bookCard-bookCover">
                    <img
                      src={similarBook.image || BOOK_PLACEHOLDER}
                      alt={similarBook.title}
                      loading="lazy"
                    />
                  </div>
                  <div className="aboutBook-bookCard-bookTitle">
                    {similarBook.title}
                  </div>
                  <div className="aboutBook-bookCard-bookAuthor">
                    {similarBook.author}
                  </div>
                  <div className="aboutBook-bookCard-bookRating">
                    ⭐{similarBook.rating}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      {showAIChat && (
        <div className="aboutBook-container2">
          <div className="aboutBook-askIBDB-box">
            <div className="aboutBook-askIBDB-title">
              <span className="aboutBook-askIBDB-titleSVG">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M295.4 37L310.2 73.8L347 88.6C350 89.8 352 92.8 352 96C352 99.2 350 102.2 347 103.4L310.2 118.2L295.4 155C294.2 158 291.2 160 288 160C284.8 160 281.8 158 280.6 155L265.8 118.2L229 103.4C226 102.2 224 99.2 224 96C224 92.8 226 89.8 229 88.6L265.8 73.8L280.6 37C281.8 34 284.8 32 288 32C291.2 32 294.2 34 295.4 37zM142.7 105.7L164.2 155.8L214.3 177.3C220.2 179.8 224 185.6 224 192C224 198.4 220.2 204.2 214.3 206.7L164.2 228.2L142.7 278.3C140.2 284.2 134.4 288 128 288C121.6 288 115.8 284.2 113.3 278.3L91.8 228.2L41.7 206.7C35.8 204.2 32 198.4 32 192C32 185.6 35.8 179.8 41.7 177.3L91.8 155.8L113.3 105.7C115.8 99.8 121.6 96 128 96C134.4 96 140.2 99.8 142.7 105.7zM496 368C502.4 368 508.2 371.8 510.7 377.7L532.2 427.8L582.3 449.3C588.2 451.8 592 457.6 592 464C592 470.4 588.2 476.2 582.3 478.7L532.2 500.2L510.7 550.3C508.2 556.2 502.4 560 496 560C489.6 560 483.8 556.2 481.3 550.3L459.8 500.2L409.7 478.7C403.8 476.2 400 470.4 400 464C400 457.6 403.8 451.8 409.7 449.3L459.8 427.8L481.3 377.7C483.8 371.8 489.6 368 496 368zM492 64C503 64 513.6 68.4 521.5 76.2L563.8 118.5C571.6 126.4 576 137 576 148C576 159 571.6 169.6 563.8 177.5L475.6 265.7L374.3 164.4L462.5 76.2C470.4 68.4 481 64 492 64zM76.2 462.5L340.4 198.3L441.7 299.6L177.5 563.8C169.6 571.6 159 576 148 576C137 576 126.4 571.6 118.5 563.8L76.2 521.5C68.4 513.6 64 503 64 492C64 481 68.4 470.4 76.2 462.5z" />
                </svg>
              </span>
              Ask IBDB AI
            </div>
            <button
              className="toggleAIBtn"
              onClick={() => setShowAIChat(false)}
            >
              <span className="aboutBook-toggleAIBtnSVG">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                  <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM231 231C240.4 221.6 255.6 221.6 264.9 231L319.9 286L374.9 231C384.3 221.6 399.5 221.6 408.8 231C418.1 240.4 418.2 255.6 408.8 264.9L353.8 319.9L408.8 374.9C418.2 384.3 418.2 399.5 408.8 408.8C399.4 418.1 384.2 418.2 374.9 408.8L319.9 353.8L264.9 408.8C255.5 418.2 240.3 418.2 231 408.8C221.7 399.4 221.6 384.2 231 374.9L286 319.9L231 264.9C221.6 255.5 221.6 240.3 231 231z" />
                </svg>
              </span>
            </button>
            <div className="aboutBook-askIBDB-subtitle">
              Your AI companian for book insights.
            </div>
          </div>
          <div className="aboutBook-askIBDB-box2">
            {messages.map((msg, index) => (
              <div key={index} className="aboutBook-askIBDB-message">
                <div
                  className={
                    msg.sender === 'user'
                      ? 'aboutBook-askIBDB-userMessageBubble'
                      : 'aboutBook-askIBDB-aiMessageBubble'
                  }
                >
                  {msg.sender === 'user' ? '👤 ' : '🤖 '}
                  {msg.text}
                </div>
              </div>
            ))}
            {/* <div className="aboutBook-askIBDB-message">
              <div className="aboutBook-askIBDB-aiMessageBubble">🤖: text</div>
            </div>
            <div className="aboutBook-askIBDB-message">
              <div className="aboutBook-askIBDB-userMessageBubble">
                👤: user text
              </div>
            </div> */}
          </div>
          <div className="aboutBook-askIBDB-box">
            <form className="aboutBook-askIBDBForm" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ask anything about this book"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button className="aboutBook-askIBDBForm-sendBtn">
                <span className="aboutBook-askIBDBForm-sendBtnSVG">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
                    <path d="M568.4 37.7C578.2 34.2 589 36.7 596.4 44C603.8 51.3 606.2 62.2 602.7 72L424.7 568.9C419.7 582.8 406.6 592 391.9 592C377.7 592 364.9 583.4 359.6 570.3L295.4 412.3C290.9 401.3 292.9 388.7 300.6 379.7L395.1 267.3C400.2 261.2 399.8 252.3 394.2 246.7C388.6 241.1 379.6 240.7 373.6 245.8L261.2 340.1C252.1 347.7 239.6 349.7 228.6 345.3L70.1 280.8C57 275.5 48.4 262.7 48.4 248.5C48.4 233.8 57.6 220.7 71.5 215.7L568.4 37.7z" />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
