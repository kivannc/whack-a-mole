import hole from './assets/hole.png';
import mole from './assets/mole.png';
import './App.css';
import { useCallback, useEffect, useState } from 'react';

const MOLE_TIMEOUT_INTERVAL = 700;
const MOLE_DISPLAY_INTERVAL = 1000;

function App() {
  const [score, setScore] = useState<number>(0);
  const [moles, setMoles] = useState<boolean[]>(new Array(9).fill(false));

  const setMoleVisibility = useCallback(
    (index: number, isVisible: boolean) => {
      const newMoles = [...moles];
      newMoles[index] = isVisible;
      setMoles(newMoles);
    },
    [moles]
  );

  function wackMole(index: number) {
    if (!moles[index]) return;
    setMoleVisibility(index, false);
    setScore(score + 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * moles.length);
      setMoleVisibility(randomIndex, true);
      setTimeout(() => {
        setMoleVisibility(randomIndex, false);
      }, MOLE_TIMEOUT_INTERVAL);
    }, MOLE_DISPLAY_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [setMoleVisibility, moles]);

  return (
    <>
      <h1>Score {score}</h1>
      <div className="grid">
        {moles.map((isMole, idx) => (
          <img
            key={idx}
            src={isMole ? mole : hole}
            alt=""
            onMouseDown={() => {
              wackMole(idx);
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
