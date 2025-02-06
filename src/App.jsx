import { useEffect, useState } from "react";
import { generateRandomColor, generateShades } from "./utils/helper";

function App() {
  return <ColorGame />;
}

export default App;

export const ColorGame = () => {
  const [targetColor, setTargetColor] = useState(null);
  const [colorOptions, setColorOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    startNewGame(true); // always start a new game on mount i.e on page reload
  }, []);

  const startNewGame = (resetScore = false) => {
    const newColor = generateRandomColor();
    const shades = generateShades(newColor);

    setTargetColor(newColor.hex);
    setColorOptions(shades.sort(() => Math.random() - 0.5));
    setIsCorrect(null);

    if (resetScore) {
      setScore(0);
    }
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setScore((prev) => prev + 1);
      setIsCorrect(true);

      setTimeout(() => startNewGame(false), 1000);
    } else {
      setIsCorrect(false);

      setTimeout(() => setIsCorrect(null), 1000);
    }
  };

  return (
    <div className="game_container">
      <h1>Color Guessing Game</h1>

      <p data-testid="gameInstructions">Guess the correct color!</p>

      <div
        data-testid="colorBox"
        className="color_box"
        style={{ "--target-color": targetColor }}
      ></div>

      <div className="color_options">
        {colorOptions.map((color, index) => (
          <button
            key={index}
            data-testid="colorOption"
            className="color_button"
            style={{ backgroundColor: color }}
            onClick={() => handleGuess(color)}
          ></button>
        ))}
      </div>

      <p data-testid="gameStatus" className="game_status">
        {isCorrect
          ? "Correct! 🎉"
          : isCorrect === false
          ? "Wrong! Try again ❌"
          : ""}
      </p>

      <p data-testid="score">Score: {score}</p>

      <button
        data-testid="newGameButton"
        onClick={() => startNewGame(true)}
        className="new_game_button"
      >
        Restart Game
      </button>
    </div>
  );
};
