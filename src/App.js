import React, { useState, useEffect } from "react";
import "./App.css";
import { colors } from "./colors";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);

  const fetchPokemons = async () => {
    const pokemon_count = 150;
    for (let i = 1; i <= pokemon_count; i++) {
      const pokemon = await getPokemon(i);
      setPokemonList((prevList) => [...prevList, pokemon]);
    }
  };

  const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div>
      <h1>Pokedex</h1>
      <div className="poke-container" id="poke-container">
        {pokemonList.map((pokemon) => {
          const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
          const id = pokemon.id.toString().padStart(3, "0");
          const poke_types = pokemon.types.map((type) => type.type.name);
          const type = Object.keys(colors).find(
            (type) => poke_types.indexOf(type) > -1
          );
          const color = colors[type];

          return (
            <div
              className="pokemon"
              style={{ backgroundColor: color }}
              key={pokemon.id}
            >
              <div className="img-container">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                  alt={name}
                />
              </div>
              <div className="info">
                <span className="number">#{id}</span>
                <h3 className="name">{name}</h3>
                <small className="type">
                  Type: <span>{type}</span>
                </small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
