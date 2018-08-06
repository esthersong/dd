import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ChatContainer from './components/ChatContainer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ChatContainer />
      </div>
    );
  }
}

export default App;
