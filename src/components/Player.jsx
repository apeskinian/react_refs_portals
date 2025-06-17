import { useState, useRef } from "react";

export default function Player() {
  // declare the playerName as a ref for the input so the input can be accessed
  const playerName = useRef();
  const [ enteredPlayerName, setEnteredPlayerName ] = useState();

  function handleClick() {
    setEnteredPlayerName(playerName.current.value);
    // clearing the input after clicking, although this is not declarative
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown player'}</h2>
      <p>
        {/* using the red prop to enable access to all the inputs methods etc */}
        <input ref={playerName} type="text"/>
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
