import React from 'react';
import logo from './../logo.svg';
import './../App.css';
import Button from "./../components/buttons/buttons";

function Home() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            <strong>Reacterial</strong> <br/>
            React JS + Material Material design
          </p>
          <Button name="label goes here" class="btn-primary"></Button>
        </header>
      </div>
    );
  }

export default Home;