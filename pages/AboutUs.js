import React from "react";
import "../App.css"; // We'll add custom styles here
import ceoPhoto from "../images/tylerdurden.webp"; // replace with actual paths
import ctoPhoto from "../images/walterwhite.jpg";
import cfoPhoto from "../images/lightyagami.webp";
import cooPhoto from "../images/guidomista.jpg";
import logo from '../images/mesaverdelogo.jpg';

export default function AboutUs() {
  const team = [
    {
      name: "Tyler Durden",
      position: "CEO",
      photo: ceoPhoto,
      bio: "Starting off as a solo soap manufacturer and salesman, Tyler started off one of the biggest and most organized Clubs in all of The United States of America. This is exactly the kind of leadership and vision Mesa Verde needs to serve your needs.",
    },
    {
      name: "Walter White",
      position: "CTO",
      photo: ctoPhoto,
      bio: "As a man of science and with a keen eye for business, Walter never shied off from learning whatever it took to keep him at the top of his game. Walter used to head a business big enough to be put on NASDAQ and has a fearless attitude to any hurdle as he is frequently quoted, 'I am the danger!'",
    },
    {
      name: "Light Yagami",
      position: "CFO",
      photo: cfoPhoto,
      bio: "One of the most brilliants minds of our country and a rank-holder of the National Talent Examination, there's little that escapes Light's eyes. A world without him would be really dark, indeed.",
    },
    {
      name: "Guido Mista",
      position: "COO",
      photo: cooPhoto,
      bio: "A sharpshooter in terms of efficiency and planning, Guido has shown excellent team work in his past experience. Guido also confessed in an interview that he's quite a fan of the band Six Pistols. Thank God we didn't put him on #4 of this list.",
    },
  ];

  return (
    <div className="about-us-container container my-5">
      <h1 className="text-center mb-4">Meet Our Team</h1>
      <div className="row">
        {team.map((member, idx) => (
          <div className="col-md-6 col-lg-3 mb-4" key={idx}>
            <div className="card about-card h-100 shadow-sm">
              <img
                src={member.photo}
                className="card-img-top"
                alt={member.name}
              />
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {member.position}
                </h6>
                <p className="card-text">{member.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="company-description mt-5 p-4 shadow-sm rounded mx-auto text-center">
        <img src={logo} style={{height: "35%", width: "35%"}}/>
        <h2>About Mesa Verde</h2>
        <p>
          Mesa Verde is your one-stop destination for all your banking needs,
          offering a seamless way to manage multiple accounts across different
          banks and branches. We combine cutting-edge technology with
          unparalleled customer service to bring you financial solutions that
          are both innovative and secure.
        </p>
      </div>
    </div>
  );
}
