import React, { useEffect, useState } from "react";
import axios from "axios";
import FetchPokemonAll from "./service/FetchPokeAll";
import "./App.css";
import CardItem from "./components/CardItem";
import { Pagination, CircularProgress } from "@mui/material";

function App() {
  const [pokemonAll, setPokemonAll] = useState([]);
  const [pageUrl, setPageUrl] = useState({});
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const fetchCharactor = async () => {
    try {
      setLoading(true);
      const response = await FetchPokemonAll();
      setPokemonAll(response.data.results);
      setPageUrl(response.data);
    } catch (error) {
      console.log("FetchPokemonData error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (event, value) => {
    try {
      setLoading(true);
      let offset = 0;
      let limit = 20;
      for (let i = 1; i < value; i++) {
        offset+=20
      }
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      setPokemonAll(response.data.results);
      setPageUrl(response.data);
      setPage(value);
    } catch (error) {
      console.log("FetchPokemonData error: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharactor();
  }, []);

  return (
    <div className="App container mt-5">
      {loading ? (
        <div className="loading-container">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="style-container">
            {pokemonAll.map((pokemon, index) => (
              <CardItem
                key={`${pokemon.name}-${index}`}
                name={pokemon.name}
                url={pokemon.url}
              />
            ))}
          </div>
          <div className="pagination">
            <Pagination
              count={Math.ceil(pageUrl.count / pageUrl.results.length)}
              onChange={handleChange}
              page={page}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
