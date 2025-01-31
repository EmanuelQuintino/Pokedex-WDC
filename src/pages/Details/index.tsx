import { useNavigate, useParams } from "react-router-dom";
import { Container } from "./styles";
import { useQueryPokemonDetails } from "../../hooks/useQueryPokemonDetails";
import pokeball from "../../assets/pokeball.png";
import { TypeCard } from "../../components/TypeCard";

export function Details() {
  const { name } = useParams();
  const { data, isLoading, isError } = useQueryPokemonDetails(name!);
  const navigate = useNavigate();

  return (
    <Container>
      {isLoading && <span className="loading">Loading...</span>}
      {!isLoading && isError && <span className="loading">Error...</span>}

      {data && (
        <div className="boxDetails">
          <button onClick={() => navigate(-1)} className="backPageButton">
            {"<"} voltar
          </button>

          <div className="pokemonImage">
            <img
              src={data.sprites.other["official-artwork"].front_default || pokeball}
              alt=""
            />
          </div>

          <div className="boxStatus">
            <strong>
              #{data.id} {data.name[0].toUpperCase() + data.name.slice(1)}
            </strong>

            <div className="sizePokemon">
              <span>Height: {data.height}0cm</span>
              <span>Weight: {data.weight / 10}kg</span>
            </div>

            <div className="boxTypes">
              {data.types.map(({ type }) => {
                return <TypeCard key={type.name} type={type.name} size={16} />;
              })}
            </div>
          </div>

          <div className="boxStats">
            {data.stats.map(({ stat, base_stat }) => {
              return (
                <div className="stats">
                  <span className="statName">{stat.name}</span>
                  <progress max={200} value={base_stat} />
                  <span className="statValue">{base_stat}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Container>
  );
}
