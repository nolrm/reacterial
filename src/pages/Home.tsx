import React from 'react';
import logo from './../logo.svg';
import './../App.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <strong>Reacterial</strong> <br/>
          React JS + Material Material design
        </p>
      </header>
    </div>
  );
}

export default Home;