import axios from "axios";

const baseURL = 'https://pokeapi.co/api/v2/pokemon/'

const FetchPokemonAll = async () => {
    try {
        const reponse = await axios.get(baseURL)
        return reponse
    } catch (error) {   
        console.log("Error fetchingPokemon", error)
    }
};

export default FetchPokemonAll;