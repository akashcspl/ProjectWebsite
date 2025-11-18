import React from "react";
import yumeko from "../images/jabamiyumeko.png"; // adjust path
import '../App.css'

export default function ContactUs() {
  return (
    <div className="contact-form">

      <img
        src={yumeko}
        alt="jabamiyumeko"
        style={{ height: "50%", width: "50%", borderRadius: "50%" }}
      />

      <h2 className="text-center mb-4">Have any questions? Let's get in touch!</h2>

      <form className="form-container" method="post" action="someserver">
        <input
          type="text"
          name="firstName"
          placeholder="Walter"
          className="form-input"
        />

        <input
          type="text"
          name="lastName"
          placeholder="White"
          className="form-input"
        />

        <input
          type="email"
          name="email"
          placeholder="example@test.com"
          className="form-input"
        />

        <textarea
          placeholder="What's on your mind?"
          className="form-textarea"
        ></textarea>

        <button type="submit" className="form-button">
          Send
        </button>
      </form>
    </div>
  );
}
