import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array.from({ length: 4 }, () => Array(4).fill(0)));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const scoreRef = useRef(score);
  const boardRef = useRef(board);
  
  useEffect(() => {
    if (score > scoreRef.current) {
      scoreRef.current = score;
      if (scoreRef.current === 2048) {
        setGameOver(true);
        setMessage('Congratulations! You win!');
      }
    }
    if (gameOver) {
      setMessage('Game Over! Try again.');
    }
  }, [score, gameOver]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const initializeBoard = () => {
    const newBoard = Array.from({ length: 4 }, () => Array(4).fill(0));
    // Add initial numbers to specific cells
    newBoard[0][0] = 2;
    newBoard[1][1] = 4;
    newBoard[2][2] = 2;
    newBoard[3][3] = 4;

    setBoard(newBoard);
  };

  const handleKeyPress = (event) => {
    if (!gameOver) {
      switch (event.key) {
        case 'ArrowUp':
          moveUp();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
        default:
          break;
      }
    }
  };

  const addRandomTile = () => {
    const emptyCells = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (board[i][j] === 0) {
          emptyCells.push({ x: i, y: j });
        }
      }
    }
    if (emptyCells.length > 0) {
      const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const value = Math.random() < 0.9 ? 2 : 4;
      const newBoard = [...board];
      newBoard[x][y] = value;
      setBoard(newBoard);
    }
  };

 

  const moveUp = () => {
    const newBoard = [...board];
    let newScore = score;
    let moved = false;

    for (let j = 0; j < 4; j++) {
      let stack = [];
      for (let i = 0; i < 4; i++) {
        if (newBoard[i][j] !== 0) {
          if (stack.length > 0 && stack[stack.length - 1] === newBoard[i][j]) {
            stack[stack.length - 1] *= 2;
            newScore += stack[stack.length - 1];
            stack.push(0);
            moved = true;
          } else {
            stack.push(newBoard[i][j]);
          }
        }
      }
      for (let i = 0; i < 4; i++) {
        newBoard[i][j] = stack[i] || 0;
      }
    }

    if (moved) {
      setScore(newScore);
      setBoard(newBoard);
      addRandomTile();
    }
  };

  const moveDown = () => {
    const newBoard = [...board];
    let newScore = score;
    let moved = false;

    for (let j = 0; j < 4; j++) {
      let stack = [];
      for (let i = 3; i >= 0; i--) {
        if (newBoard[i][j] !== 0) {
          if (stack.length > 0 && stack[stack.length - 1] === newBoard[i][j]) {
            stack[stack.length - 1] *= 2;
            newScore += stack[stack.length - 1];
            stack.push(0);
            moved = true;
          } else {
            stack.push(newBoard[i][j]);
          }
        }
      }
      for (let i = 3; i >= 0; i--) {
        newBoard[i][j] = stack.pop() || 0;
      }
    }

    if (moved) {
      setScore(newScore);
      setBoard(newBoard);
      addRandomTile();
    }
  };

  const moveLeft = () => {
    const newBoard = [...board];
    let newScore = score;
    let moved = false;

    for (let i = 0; i < 4; i++) {
      let stack = [];
      for (let j = 0; j < 4; j++) {
        if (newBoard[i][j] !== 0) {
          if (stack.length > 0 && stack[stack.length - 1] === newBoard[i][j]) {
            stack[stack.length - 1] *= 2;
            newScore += stack[stack.length - 1];
            stack.push(0);
            moved = true;
          } else {
            stack.push(newBoard[i][j]);
          }
        }
      }
      for (let j = 0; j < 4; j++) {
        newBoard[i][j] = stack[j] || 0;
      }
    }

    if (moved) {
      setScore(newScore);
      setBoard(newBoard);
      addRandomTile();
    }
  };

  const moveRight = () => {
    const newBoard = [...board];
    let newScore = score;
    let moved = false;

    for (let i = 0; i < 4; i++) {
      let stack = [];
      for (let j = 3; j >= 0; j--) {
        if (newBoard[i][j] !== 0) {
          if (stack.length > 0 && stack[stack.length - 1] === newBoard[i][j]) {
            stack[stack.length - 1] *= 2;
            newScore += stack[stack.length - 1];
            stack.push(0);
            moved = true;
          } else {
            stack.push(newBoard[i][j]);
          }
        }
      }
      for (let j = 3; j >= 0; j--) {
        newBoard[i][j] = stack.pop() || 0;
      }
    }

    if (moved) {
      setScore(newScore);
      setBoard(newBoard);
      addRandomTile();
    }
  };

  return (
    <div className="App">
      <h1>2048</h1>
      <div className="Score">Score: {score}</div>
      <div className="Board">
        {board.map((row, i) => (
          <div key={i} className="Row">
            {row.map((cell, j) => (
              <div key={`${i}-${j}`} className={`Cell value-${cell}`}>
                {cell !== 0 && cell}
              </div>
            ))}
          </div>
        ))}
      </div>
      {message && <div className="Message">{message}</div>}
    </div>
  );
}

export default App;
