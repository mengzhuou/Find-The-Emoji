import React from 'react';
import './App.css';
import background from './background/b1.jpeg'

const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃'];


function App() {
  return (
    <div className="App">
      <img className="background_img" src={background} alt="Background" />
      <header className="App-header">
        <p>
          Emoji App
          {String.fromCodePoint(0x1F600)}
        </p>
      </header>
    </div>
  );
}

export default App;
