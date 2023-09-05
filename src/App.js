import React, { useEffect, useState } from "react";
import axios from "axios";
import FetchPokemonAll from "./service/FetchPokeAll";
import "./App.css";
import CardItem from "./components/CardItem";
import { Pagination } from "@mui/material";

function App() {
  const [pokemonAll, setPokemonAll] = useState([]);
  const [pageUrl, setPageUrl] = useState([]);

  const [page, setPage] = useState(1);

  const fetchCharactor = async () => {
    try {
      const response = await FetchPokemonAll();
      setPokemonAll(response.data.results);
      setPageUrl(response.data);
      console.log(response.data)
    } catch (error) {
      console.log("FetchPokemonData error: ", error);
    }
  };

  const handleChange = async (event, value) => {
    try {
      if (value > page) {
        const response = await axios.get(pageUrl.next)
        setPokemonAll(response.data.results);
        setPageUrl(response.data);
        setPage(value);
      }else if (value < page){
        const response = await axios.get(pageUrl.previous)
        setPokemonAll(response.data.results);
        setPageUrl(response.data);
        setPage(value);
      }
    } catch (error) {
      console.log("FetchPokemonData error: ", error);
    }
  };

  useEffect(() => {
    fetchCharactor();
  }, []);

  console.log(pokemonAll);

  return (
    <div className="App container mt-5">
      <div className="style-container">
        {pokemonAll.map((pokemon, index) => {
          return (
            <CardItem
              key={`${pokemon.name}-${index}`}
              name={pokemon.name}
              url={pokemon.url}
            />
          );
        })}
      </div>
      <div className="pagination">
        <Pagination
          count={10}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default App;
