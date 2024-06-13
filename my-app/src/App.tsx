import React, { useEffect, useState } from 'react';
import './App.css';
import background from './background/b1.jpeg'

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

  useEffect(() => {
    const updatePositions = () => {
      setEmojiPositions(prevPositions =>
        prevPositions.map(pos => {
          let { top, left, x, y } = pos;

          top += y;
          left += x;

          if (top <= 0 || top >= 90) y = -y; // Reverse direction if hitting top or bottom
          if (left <= 0 || left >= 90) x = -x; // Reverse direction if hitting left or right

          return { ...pos, top, left, x, y };
        })
      );
      requestAnimationFrame(updatePositions);
    };

    requestAnimationFrame(updatePositions);
  }, []);

  return (
    <div className="App">
      <img className="background_img" src={background} alt="Background" />
      <div className="emoji-container">
        {emojiPositions.map((pos, index) => (
          <span
            key={index}
            className="emoji"
            style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
          >
            {pos.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}

export default App;