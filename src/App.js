import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [chosenPokemon, setChosenPokemon] = useState(false);
  const [pokemonInfo, setPokemonInfo] = useState({
    name: "",
    index: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: "",
  });

  function searchPokemon() {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (res) => {
        setPokemonInfo({
          name: res.data.name[0].toUpperCase() + res.data.name.substring(1),
          index: res.data.id,
          img: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          type:
            res.data.types[0].type.name[0].toUpperCase() +
            res.data.types[0].type.name.substring(1),
        });
        setChosenPokemon(true);
      }
    );
  }

  return (
    <div className="App">
      <div className="title">
        <h1>Pokemon Database</h1>
        <input
          type="text"
          placeholder="Search"
          onChange={(event) => {
            setPokemonName(event.target.value);
          }}
        />
        <button onClick={searchPokemon}>Search</button>
      </div>
      <div className="middle-display">.</div>
      <div className="display-section">
        {!chosenPokemon ? (
          <h1>Please choose a pokemon</h1>
        ) : (
          <>
            <h2>{pokemonInfo.name}</h2>
            <img src={pokemonInfo.img} />
            <h3>Index: {pokemonInfo.index}</h3>
            <h3>Type: {pokemonInfo.type}</h3>
            <h3>HP: {pokemonInfo.hp}</h3>
            <h3>Attack: {pokemonInfo.attack}</h3>
            <h3>Defense: {pokemonInfo.defense}</h3>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
