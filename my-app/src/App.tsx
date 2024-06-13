import React from 'react';
import './App.css';
import background from './background/b1.jpeg'

const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃'];

const getRandomPos = () => ({
  top: `${Math.random() * 90}%`,
  left: `${Math.random() * 90}%`
});

const getRandomDirection = () => ({
  '--move-x': `${Math.random() * 200 - 100}px`,
  '--move-y': `${Math.random() * 200 - 100}px`,
});


function App() {
  return (
    <div className="App">
      <img className="background_img" src={background} alt="Background" />
      <div className="emoji-container">
          {emojis.map((emoji, index) => (
            <React.Fragment key={index}>
              {Array.from({ length:Math.floor(Math.random() * (20-5 + 1)) + 5 }).map((_, arrIndex) => (
                <span 
                  key={index}
                  className='emoji'
                  style={{ ...getRandomPos(), ...getRandomDirection() }}
                >

                  {emoji}
                </span>
              ))}
            </React.Fragment>
          ))}
      </div> 
    </div>
  );
}

export default App;
