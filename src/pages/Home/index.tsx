import { Link } from "react-router-dom";
import { PokemonCard } from "../../components/PokemonCard";
import { Container } from "./styles";
import { useQueryPokemonPage } from "../../hooks/useQueryPokemonPage";

export function Home() {
  const { data, isLoading, error, page, nextPage, prevPage, totalPage } =
    useQueryPokemonPage(); // ...query

  function handleNextPage() {
    // window.scrollTo({ top: 0 });
    nextPage();
  }

  function handlePrevPage() {
    // window.scrollTo({ top: 0 });
    prevPage();
  }

  console.log("aaaa");

  return (
    <Container>
      <h1>Bem-vindo(a) à Pokédex do Reprograma Jucás</h1>

      {isLoading && <span className="loading">Loading...</span>}
      {!isLoading && error && <span className="loading">Error...</span>}

      <div className="gridCards">
        {data?.map((pokemon) => {
          return (
            <Link to={`/details/${pokemon.name}`} key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </Link>
          );
        })}
      </div>

      <div className="paginationComponent">
        <button onClick={handlePrevPage}>{"<"} Anterior</button>

        <span className="numberPage">
          {String(page).padStart(2, "0")}/{totalPage}
        </span>

        <button onClick={handleNextPage}>Próximo {">"}</button>
      </div>
    </Container>
  );
}
