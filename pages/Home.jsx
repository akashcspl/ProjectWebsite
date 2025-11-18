import React from 'react'

const Home = () => {
  return (
    <header className="App-header">
      <div className="position-relative">
        <img src="https://www.breakingbad-locations.com/wp-content/uploads/2018/11/vlcsnap-2018-11-17-17h20m09s781.jpg" alt="background" className="img-fluid" />

        <h1 className="position-absolute top-0 start-0 m-3 text-white">
          Welcome to <span className="text-danger">Mesa Verde</span>, your one-stop destination for all your banking needs.
        </h1>
      </div>
    </header>
  )
}

export default Home