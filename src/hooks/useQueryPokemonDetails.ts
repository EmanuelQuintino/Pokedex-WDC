import { useQuery } from "@tanstack/react-query";
import { API } from "../configs/api";
import { Pokemon } from "../@types/pokemon";

async function getPokemonDetails(name: string) {
  const { data } = await API.get(`/pokemon/${name}`);
  return data as Pokemon;
}

export function useQueryPokemonDetails(name: string) {
  const query = useQuery({
    queryKey: [`getPokemonDetails`, name],
    queryFn: () => getPokemonDetails(name),
  });

  return query;
}
