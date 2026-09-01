import { Link } from 'react-router-dom'
import './Contact.css'

export default function Contact() {
  return (
    <>
      <main className="contact-main">
        <title>IBDB - Contact</title>
        {/* =========================
            BREADCRUMB
        ========================= */}

        <div className="contact-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <span>Contact</span>
        </div>

        {/* =========================
            MAIN CONTACT SECTION
        ========================= */}

        <section className="contact-hero">
          {/* LEFT INFORMATION */}

          <div className="contact-intro">
            <div className="contact-heading">
              Contact <span>Us</span>
            </div>

            <div className="contact-heading-line"></div>

            <h2>We’d love to hear from you!</h2>

            <p>
              Have a question, suggestion, or just want to say hello? Fill out
              the form and we’ll get back to you as soon as possible.
            </p>

            <div className="contact-image">
              <img src="/src/assets/contact.png" alt="Books and reading desk" />
            </div>
          </div>

          {/* MESSAGE FORM */}

          <div className="contact-form-card">
            <div className="contact-form-heading">
              <span className="contact-form-icon">
                <svg viewBox="0 0 640 640">
                  <path d="M64 128C64 92.7 92.7 64 128 64H512C547.3 64 576 92.7 576 128V416C576 451.3 547.3 480 512 480H360.6L249.7 563.1C232.2 576.2 208 563.7 208 542V480H128C92.7 480 64 451.3 64 416V128ZM128 128V416H240C257.7 416 272 430.3 272 448V477.8L338.4 428C349.5 419.7 363 415.2 376.9 415.2H512V128H128Z" />
                </svg>
              </span>

              <div>
                <h2>Send us a Message</h2>
                <p>We typically respond within 24–48 hours.</p>
              </div>
            </div>

            <form
              className="contact-form"
              action="https://api.web3forms.com/submit"
              method="POST"
            >
              <div className="contact-form-row">
                <input
                  type="hidden"
                  name="access_key"
                  value="a19c81a2-c263-4cda-87b3-a7762ea15747"
                ></input>
                {/* NAME */}

                <div className="contact-input-wrapper">
                  <svg viewBox="0 0 640 640">
                    <path d="M320 352C399.5 352 464 287.5 464 208C464 128.5 399.5 64 320 64C240.5 64 176 128.5 176 208C176 287.5 240.5 352 320 352ZM320 128C364.2 128 400 163.8 400 208C400 252.2 364.2 288 320 288C275.8 288 240 252.2 240 208C240 163.8 275.8 128 320 128ZM96 576C96 478.8 175.3 400 272.5 400H367.5C464.7 400 544 478.8 544 576H480C480 514.1 429.9 464 368 464H272C210.1 464 160 514.1 160 576H96Z" />
                  </svg>

                  <input
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    required
                  />
                </div>

                {/* EMAIL */}

                <div className="contact-input-wrapper">
                  <svg viewBox="0 0 640 640">
                    <path d="M64 160C64 107 107 64 160 64H480C533 64 576 107 576 160V480C576 533 533 576 480 576H160C107 576 64 533 64 480V160ZM128 160V192L320 320L512 192V160C512 124.7 483.3 96 448 96H192C156.7 96 128 124.7 128 160ZM128 272V480C128 497.7 142.3 512 160 512H480C497.7 512 512 497.7 512 480V272L338.7 387.5C327.6 394.9 312.4 394.9 301.3 387.5L128 272Z" />
                  </svg>

                  <input
                    type="email"
                    placeholder="Your Email"
                    name="email"
                    required
                  />
                </div>
              </div>

              {/* SUBJECT */}

              <div className="contact-input-wrapper">
                <svg viewBox="0 0 640 640">
                  <path d="M128 96C92.7 96 64 124.7 64 160V480C64 515.3 92.7 544 128 544H512C547.3 544 576 515.3 576 480V160C576 124.7 547.3 96 512 96H128ZM128 160H512V480H128V160ZM192 224H448V288H192V224ZM192 320H384V384H192V320Z" />
                </svg>

                <input type="text" placeholder="Subject" required />
              </div>

              {/* MESSAGE */}

              <div className="contact-textarea-wrapper">
                <svg viewBox="0 0 640 640">
                  <path d="M535.7 128.3C557.8 150.4 557.8 186.2 535.7 208.3L247.7 496.3L112 528L144 392.3L432 104.3C454.1 82.2 489.9 82.2 512 104.3L535.7 128.3ZM459.7 176.3L431.7 148.3L194.1 385.9L182.4 435.6L232.1 423.9L459.7 196.3V176.3Z" />
                </svg>

                <textarea
                  placeholder="Your Message"
                  name="message"
                  rows="6"
                  required
                ></textarea>
              </div>

              {/* SEND BUTTON */}

              <button type="submit" className="contact-submit-btn">
                <svg viewBox="0 0 640 640">
                  <path d="M568.4 37.7C578.3 29.6 592.1 28.4 603.2 34.6C614.3 40.8 620.6 53.4 618.9 66L558.4 514C556.8 526.1 548.8 536.5 537.4 541.3C526 546.1 512.9 544.6 502.9 537.4L351.6 427.5L273.4 505.7C265.3 513.8 253.4 518.3 242 518.3C218.2 518.3 198.9 499 198.9 475.2V381.2L68.6 286.5C57.6 278.5 51.7 265.2 53.2 251.8C54.7 238.4 63.3 226.8 76 221.4L568.4 37.7ZM130.8 263.8L251.8 351.8L481.1 100.6L130.8 263.8ZM263 410.1V450.4L299.2 414.2L263 410.1ZM352.2 373.3L505.6 484.7L550.1 155.3L352.2 373.3Z" />
                </svg>
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* =========================
            OTHER WAYS TO CONTACT
        ========================= */}

        <section className="contact-other">
          <div className="contact-section-heading">
            <h2>Other Ways to contact us</h2>
            <div></div>
          </div>

          <div className="contact-cards">
            {/* EMAIL */}

            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 640 640">
                  <path d="M64 160C64 107 107 64 160 64H480C533 64 576 107 576 160V480C576 533 533 576 480 576H160C107 576 64 533 64 480V160ZM128 160V192L320 320L512 192V160C512 124.7 483.3 96 448 96H192C156.7 96 128 124.7 128 160ZM128 272V480C128 497.7 142.3 512 160 512H480C497.7 512 512 497.7 512 480V272L338.7 387.5C327.6 394.9 312.4 394.9 301.3 387.5L128 272Z" />
                </svg>
              </div>

              <h3>Email Us</h3>

              <p>For general inquiries</p>

              <div className="contact-card-divider"></div>

              <a href="mailto:ayushkasera.dev@gmail.com">
                ayushkasera.dev@gmail.com
              </a>
            </div>

            {/* SUPPORT */}

            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 640 640">
                  <path d="M320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64ZM320 128C426.1 128 512 213.9 512 320C512 426.1 426.1 512 320 512C213.9 512 128 426.1 128 320C128 213.9 213.9 128 320 128ZM224 320C224 373 267 416 320 416C373 416 416 373 416 320H352C352 337.7 337.7 352 320 352C302.3 352 288 337.7 288 320H224Z" />
                </svg>
              </div>

              <h3>Support</h3>

              <p>Need help? We’re here.</p>

              <div className="contact-card-divider"></div>

              <a href="mailto:ayushkasera.dev@gmail.com">
                ayushkasera.dev@gmail.com
              </a>
            </div>

            {/* OFFICE */}

            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 640 640">
                  <path d="M320 64C196.3 64 96 164.3 96 288C96 449.6 320 576 320 576C320 576 544 449.6 544 288C544 164.3 443.7 64 320 64ZM320 384C267 384 224 341 224 288C224 235 267 192 320 192C373 192 416 235 416 288C416 341 373 384 320 384Z" />
                </svg>
              </div>

              <h3>Our Office</h3>

              <p>Visit us 24X7</p>

              <div className="contact-card-divider"></div>

              <span>ibdb.com</span>
            </div>

            {/* HOURS */}

            <div className="contact-card">
              <div className="contact-card-icon">
                <svg viewBox="0 0 640 640">
                  <path d="M320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64ZM320 128C426.1 128 512 213.9 512 320C512 426.1 426.1 512 320 512C213.9 512 128 426.1 128 320C128 213.9 213.9 128 320 128ZM288 192V320C288 331.3 294 341.8 303.8 347.5L383.8 395.5L416.8 340.5L352 301.7V192H288Z" />
                </svg>
              </div>

              <h3>Business Hours</h3>

              <p>We’re open</p>

              <div className="contact-card-divider"></div>

              <span>24X7</span>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
