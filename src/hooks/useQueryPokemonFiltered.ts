import { useQuery } from "@tanstack/react-query";
import { API } from "../configs/api";
import { Pokemon } from "../@types/pokemon";

export function useQueryPokemonFiltered(name: string) {
  async function getPokemonFiltered(name: string) {
    const { data } = await API.get(`/pokemon?limit=10000&offset=0`);
    const allPokemon = [...data.results];

    const filteredPokemon = allPokemon.filter((pokemon) => {
      return pokemon.name.includes(name.toLowerCase());
    });

    const pokemonPromise = filteredPokemon.map(async (pokemon: { url: string }) => {
      const response = await fetch(pokemon.url);
      return response.json();
    });

    const pokemonData = await Promise.all(pokemonPromise);

    return pokemonData as Pokemon[];
  }

  const query = useQuery({
    queryKey: [`getPokemonFiltered`, name],
    queryFn: () => getPokemonFiltered(name),
  });

  return query;
}
