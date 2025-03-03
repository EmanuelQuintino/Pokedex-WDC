import { useQuery } from "@tanstack/react-query";
import { API } from "../configs/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pokemon } from "../@types/pokemon";

export function useQueryPokemonPage() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(30);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();
  const searchParams = useSearchParams();

  async function getPokemonPage({ page = 1, limit = 30 }) {
    if (page <= 0) page = 1;
    const offset = (page - 1) * limit;
    const { data } = await API.get(`/pokemon?limit=${limit}&offset=${offset}`);

    const pokemonPromise = data.results.map(async (pokemon: { url: string }) => {
      const response = await fetch(pokemon.url);
      return response.json();
    });

    const pokemonData = await Promise.all(pokemonPromise);

    const totalPokemon = data.count;
    const totalPagesAPI = Math.ceil(totalPokemon / limit);

    if (totalPages != totalPagesAPI) setTotalPages(totalPagesAPI);

    return pokemonData as Pokemon[];
  }

  function nextPage() {
    if (page < totalPages) {
      navigate(`?page=${page + 1}`);
    }
  }

  function prevPage() {
    if (page > 1) {
      // setPage((prevPage) => prevPage - 1);
      navigate(`?page=${page - 1}`);
    }
  }

  useEffect(() => {
    const pageQuery = Number(searchParams[0].get("page"));
    setPage(pageQuery || 1);

    if (totalPages > 0) {
      if (pageQuery > totalPages) {
        navigate(`?page=${totalPages}`);
        return;
      }

      if (pageQuery < 1) {
        navigate(`?page=1`);
        return;
      }
    }
  }, [totalPages, searchParams, navigate]);

  const query = useQuery({
    queryKey: [`getPokemonPage`, page, limit],
    queryFn: () => getPokemonPage({ page, limit }),
  });

  return {
    ...query,
    page,
    totalPages,
    nextPage,
    prevPage,
    setLimit,
  };
}
