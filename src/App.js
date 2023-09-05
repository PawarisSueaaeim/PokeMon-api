import React, { useEffect, useState } from "react";
import FetchPokemonAll from "./service/FetchPokeAll";
import "./App.css"
import CardItem from "./components/CardItem";

function App() {
  const [pokemonAll, setPokemonAll] = useState([]);

  useEffect(() => {
    const fetchCharactor = async () => {
      try {
        const response = await FetchPokemonAll();
        setPokemonAll(response.data.results);
      } catch (error) {
        console.log("FetchPokemonData error: ", error);
      }
    };
    fetchCharactor();
  }, []);

  console.log(pokemonAll);

  return (
    <div className="App container mt-5">
      <div className="style-container">
        {pokemonAll.map((pokemon, index) => {
          return (
            <CardItem key={`${pokemon.name}-${index}`} name={pokemon.name} url={pokemon.url}/>
          );
        })}
      </div>
    </div>
  );
}

export default App;
