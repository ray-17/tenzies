import { useEffect, useRef, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => (
        {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid(),
        }))
  }
  const [dieState, setDieState] = useState(() => generateAllNewDice())
  const [count, setCount] = useState(0)
  const buttonRef = useRef(null)





  const gameWon = dieState.every(die => die.isHeld) &&
    dieState.every(die => die.value === dieState[0].value)

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus()
    }
  }, [gameWon])

  function hold(id) {
    setDieState(prev => prev.map(item => {
      return item.id === id ? { ...item, isHeld: !item.isHeld } : item
    }))
  }

  function reRoll() {
    setDieState(prev => prev.map(item => {
      return item.isHeld !== true ? { ...item, value: Math.ceil(Math.random() * 6) } : item
    }))

    setCount(prev => prev + 1)
  }

  const diceElements = dieState.map(dice =>
    <Die
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      hold={hold}
      id={dice.id} />)

  function newGame() {
    setDieState(generateAllNewDice)
    setCount(0)
  }




  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <div className="container">
        <div className="game-info">
          <div className="timer">Timer: 00:00</div>
          <span className="title">Tenzies</span>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice">
            {diceElements}
          </div>

          <button
            ref={buttonRef}
            onClick={() => { gameWon ? newGame() : reRoll() }} className="roll">{gameWon ? "New Game" : "Roll"}
          </button>
          <div className="roll-count">Roll Count: {count}</div>
        </div>
      </div>
    </main>
  )
}