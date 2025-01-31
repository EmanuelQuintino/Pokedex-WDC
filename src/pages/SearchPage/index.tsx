import { Link, useSearchParams } from "react-router-dom";
import { PokemonCard } from "../../components/PokemonCard";
import { Container } from "./styles";
import { useQueryPokemonFiltered } from "../../hooks/useQueryPokemonFiltered";

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const queryPokemonName = searchParams.get("q");

  const { data, isLoading, error } = useQueryPokemonFiltered(queryPokemonName!); // ...query

  return (
    <Container>
      {isLoading && <span className="loading">Loading...</span>}
      {!isLoading && error && <span className="loading">Error...</span>}

      {data && (
        <h1>{`Encontrado ${data.length} resultados(s) para "${queryPokemonName}"`}</h1>
      )}

      <div className="gridCards">
        {data?.map((pokemon) => {
          return (
            <Link to={`/details/${pokemon.name}`} key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
