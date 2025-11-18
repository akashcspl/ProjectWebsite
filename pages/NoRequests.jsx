import React from 'react';
import hornetsilksong from '../images/hornetsilksong.png'
import '../App.css';

const NoRequests = () => {
  return (
    <div className="image-container">
      <img src={hornetsilksong} alt="hornetsilksong" style={{height: "50%", width: "50%", display: "block", margin: "0 auto"}}/>
        <div class="overlay-text"><h1>Requests used to be believable.</h1></div>
    </div>
    )
}

export default NoRequests