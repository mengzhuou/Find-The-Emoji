import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const emojisArray = [
  ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🫠'],
  ['🥹', '😢', '😭', '🥺', '🥵', '😥', '😓', '😩', '😔', '😕'],
  ['🤫', '🤥', '😶', '😶‍🌫️', '😐', '😑', '😬', '🫨', '🙃', '🙄'],
  ['😲', '🥱', '😴', '🤤', '😪', '😵', '😵‍💫', '🫥', '🤐', '🥴'],
  ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'],
  ['👩‍❤️‍👩', '💑', '👨‍❤️‍👨', '👩‍❤️‍👨', '👩‍❤️‍💋‍👩', '💏', '👨‍❤️‍💋‍👨', '👩‍❤️‍💋‍👨'],
  ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐼', '🐻', '🐷', '🐧'],
  ['🌞', '🌝', '🌛', '🌜', '🌔', '🌖', '🌗', '🌘', '🌒', '🌓'],
  ['🍏', '🥝', '🍈', '🍐', '🥑', '🥦', '🫛', '🫑', '🧃', '🍉'],
  ['❤️', '🩷', '🧡', '❤️‍🔥', '💔', '💕', '💞', '💓', '💖', '💝'],
  ['🤝🏻', '🤝🏽', '🤝🏿', '🫱🏻‍🫲🏼', '🫱🏻‍🫲🏽', '🫱🏻‍🫲🏿', '🫱🏼‍🫲🏾', '🫱🏽‍🫲🏿', '🫱🏿‍🫲🏻', '🫱🏿‍🫲🏾'],
  ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'],
  ['🈷️', '🈚️', '🈸', '🈲', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹'],
  ['❤️', '🩷', '🧡', '❤️‍🔥', '💔', '💕', '💞', '💓', '💖', '💝'],
];

const backgroundContext = (require as any).context('./background', false, /\.(png|jpe?g|svg)$/);
const backgroundImages = backgroundContext.keys().map(backgroundContext);

const arrNum = Math.floor(Math.random() * emojisArray.length);
const emojis = emojisArray[arrNum];

const getRandomPos = () => ({
  top: Math.random() * 90,
  left: Math.random() * 90,
});

const getRandomDirection = () => ({
  x: Math.random() * 0.10 - 0.05,
  y: Math.random() * 0.10 - 0.05,
});

function App() {
  const [emojiPositions, setEmojiPositions] = useState(
    emojis.flatMap((emoji) =>
      Array.from({ length: Math.floor(Math.random() * (25 - 8 + 1)) + 5 }).map(() => ({
        emoji,
        ...getRandomPos(),
        ...getRandomDirection()
      }))
    )
  );

  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
    console.log("randomImage", randomImage);
    setBackgroundImage(randomImage);
  }, []);

  const [fixedEmojiIndex] = useState(() => Math.floor(Math.random() * emojiPositions.length));

  const requestRef = useRef<number>();

  const updatePositions = () => {
    setEmojiPositions((prevPositions) =>
      prevPositions.map((pos, index) => {
        if (index === fixedEmojiIndex) {
          return pos;
        }

        let { top, left, x, y } = pos;

        top += y;
        left += x;

        if (top <= 0 || top >= 90) y = -y;
        if (left <= 0 || left >= 90) x = -x;

        return { ...pos, top, left, x, y };
      })
    );
    requestRef.current = requestAnimationFrame(updatePositions);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updatePositions);
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
      {backgroundImage && <img className="background_img" src={backgroundImage} alt="Background" />}
      <div className="emoji-container">
        {!isInfoClicked && (
          <FontAwesomeIcon
            icon={faInfoCircle}
            className='infoIcon'
            onMouseEnter={() => setIsInfoClicked(true)}
            onMouseLeave={() => setIsInfoClicked(false)}
          />
        )}
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
          Find the only emoji that doesn't move.<br />
          <span className='info-madeByName'>
            Made by <a className="info-myyName" href="https://mengzhuou.github.io/" target="_blank" rel="noreferrer">Mengzhu Ou</a>.
            Pictures mainly came from <a className="info-myyName" href="https://www.pexels.com/zh-CN/search/%E9%A3%8E%E6%99%AF/?orientation=landscape" target="_blank" rel="noreferrer">Pexels</a>.
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
