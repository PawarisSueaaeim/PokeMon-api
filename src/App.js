import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Pagination, CircularProgress } from "@mui/material";

import "./App.css";
import FetchPokemonAll from "./service/FetchPokeAll";
import CardItem from "./components/CardItem";
import CardItemModal from "./components/CardItemModal";

const setPokeContext = React.createContext();

function App() {
  const [pokemonAll, setPokemonAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal ] = useState(false);

  const [page, setPage] = useState(1);

  const fetchCharactor = async () => {
    try {
      setLoading(true);
      const response = await FetchPokemonAll();
      setPokemonAll(response.data.results);
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
        offset += 20;
      }
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
      );
      setPokemonAll(response.data.results);
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
    <setPokeContext.Provider value={pokemonAll}>
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
              <Pagination count={10} onChange={handleChange} page={page} />
            </div>
          </>
        )}
      </div>
      <CardItemModal open={true}/>
    </setPokeContext.Provider>
  );
}

export { setPokeContext };
export default App;
