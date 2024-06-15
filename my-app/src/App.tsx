import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import background from './background/b1.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';


const emojis = ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃'];

const getRandomPos = () => ({
  top: Math.random() * 90,
  left: Math.random() * 90,
});

const getRandomDirection = () => ({
  x: Math.random() * 0.10 - 0.01, 
  y: Math.random() * 0.10 - 0.01, 
});

function App() {
  const [emojiPositions, setEmojiPositions] = useState(
    emojis.flatMap((emoji, emojiIndex) => 
      Array.from({ length: Math.floor(Math.random() * (20 - 5 + 1)) + 5 }).map(() => ({
        emoji,
        ...getRandomPos(),
        ...getRandomDirection()
      }))
    )
  );

  // generate random target emoji index
  const [fixedEmojiIndex] = useState(() => Math.floor(Math.random() * emojiPositions.length));

  const requestRef = useRef<number>();

  const updatePositions = () => {
    setEmojiPositions((prevPositions) =>
      prevPositions.map((pos, index) => {
        // Skip updating the fixed emoji
        if (index === fixedEmojiIndex) {
          return pos; 
        }

        // for each emoji set up their location
        let { top, left, x, y } = pos;

        // example of what the "pos" object contain
        // left:84.12427425601041
        // top:1.5469949535781993
        // x:-0.04914749718891968
        // y:-0.039255366406301485


        top += y;
        left += x;

        // Reverse direction if hitting top or bottom
        if (top <= 0 || top >= 90) y = -y; 
        if (left <= 0 || left >= 90) x = -x;

        return { ...pos, top, left, x, y };
      })
    );
    requestRef.current = requestAnimationFrame(updatePositions);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updatePositions);
    // Clean up on unmount
    return () => cancelAnimationFrame(requestRef.current!); 
  }, []);

  const handleEmojiClick = (index: number) => {
    if (index === fixedEmojiIndex) {
      alert('Congrats! You have a good sight!');
      window.location.reload();
    }
  };

  const [isInfoClicked, setIsInfoClicked] = useState(false);

  return (
    <div className="App">
      <img className="background_img" src={background} alt="Background" />
      <div className="emoji-container">
        <FontAwesomeIcon 
          icon={faInfoCircle} 
          className='infoIcon' 
          onMouseEnter={() => setIsInfoClicked(true)}
          onMouseLeave={() => setIsInfoClicked(false)}
        />
        {emojiPositions.map((pos, index) => (
          <span
            key={index}
            className={`emoji ${index === fixedEmojiIndex ? 'target' : ''}`}
            style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
            onClick={() => handleEmojiClick(index)}
          >
            {pos.emoji}
          </span>
        ))}
      </div>
      {isInfoClicked && (
        <div 
          className='info-container'
          onMouseEnter={() => setIsInfoClicked(true)}
          onMouseLeave={() => setIsInfoClicked(false)}
        >
          Find the only emoji that doesn't move.<br/> 
          <span className='info-madeByName'>
            Made by <a className="info-myyName" href="https://mengzhuou.github.io/">Mengzhu Ou</a>.
          </span>
        </div>
      )}
    </div>
  );
}

export default App;