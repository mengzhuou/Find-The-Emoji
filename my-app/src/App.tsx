import React from 'react';
import './App.css';
import background from './background/b1.jpeg'

const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃'];



function App() {
  return (
    <div className="App">
      <img className="background_img" src={background} alt="Background" />
      <div>
          {emojis.map((emoji, index) => (
            
            <span key={index}>
              {emoji}
            </span>
          ))}
      </div> 
    </div>
  );
}

export default App;
