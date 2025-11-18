import React from 'react'
import '../App.css'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import handhshake from '../images/bcshandshake.webp';
import doppiophone from '../images/doppiophone.jpg';

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/signup"); // <-- Your predefined route
  };

  const handleContactClick = () => {
    navigate("/contactus"); // <-- Your predefined route
  };

  const cards = [
    {
      title: "View All Accounts",
      text: "Save your time by viewing all your bank accounts in one place."
    },
    {
      title: "Deposit or Withdraw Money",
      text: "Deposit or withdraw cash in a very easy and secure way, from any bank account you like."
    },
    {
      title: "Transfer money",
      text: "Transferring of funds from one account to another made easy and convenient."
    },
    {
      title: "Open or Close Accounts",
      text: "Opening and closing bank accounts have always been a hassle with physical banks. Here, the process takes less than a minute."
    },
    {
      title: "View Statistics",
      text: "Data is king in today's world. Find easy-to-analyze data based on your banking transactions within seconds to carry out stuff more efficiently."
    },
    {
      title: "Utmost Customer Satisfaction",
      text: "We have a clear record of zero problems from the customers, makes us wonder why we pay our Grievance Team in the first place."
    }
  ];
  return (
    <>
      <header className="App-header">
        <div className="position-relative">
          <img src="https://www.breakingbad-locations.com/wp-content/uploads/2018/11/vlcsnap-2018-11-17-17h20m09s781.jpg" alt="background" className="img-fluid" />

          <h1 className="position-absolute top-0 start-0 m-3 text-white">
            Welcome to <span className="text-danger">Mesa Verde</span>, your one-stop destination for all your banking needs.
          </h1>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-4 fw-bold">What We Provide</h2>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            speed={800}
            grabCursor={true}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
            style={{ paddingBottom: "30px" }}
          >
            {cards.map((card, index) => (
              <SwiperSlide key={index}>
                <div className="card shadow-sm h-100 what-we-do-card">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold">{card.title}</h5>
                    <p className="card-text flex-grow-1">{card.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">

            {/* Left: Image */}
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={handhshake}
                alt="Join us"
                className="img-fluid rounded shadow"
              />
            </div>

            {/* Right: Text + CTA */}
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">Interested? You Should Join Us.</h2>
              <p className="text-muted mb-4">
                Become part of a growing platform built on innovation, efficiency,
                and a commitment to delivering exceptional digital banking experiences.
                Whether you're a client, partner, or future team member — we would love
                to have you onboard.
              </p>

              <button
                className="btn btn-primary btn-lg"
                onClick={handleJoinClick}
              >
                Learn More & Get Started
              </button>
            </div>

          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">

            {/* Left: Text + CTA */}
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="fw-bold mb-3">Talk to Us</h2>
              <p className="text-muted mb-4">
                Have questions or need assistance? Our team is here to provide you
                with the support you need. Reach out today, and we'll make sure your
                queries are addressed promptly and professionally.
              </p>
              <button
                className="btn btn-primary btn-lg"
                onClick={handleContactClick}
              >
                Contact Us
              </button>
            </div>

            {/* Right: Image */}
            <div className="col-md-6">
              <img
                src={doppiophone} // <-- replace with your image path
                alt="Contact Us"
                className="img-fluid rounded shadow"
              />
            </div>

          </div>
        </div>
      </section>

    </>
  )
}

export default Home