import { Pokemon } from "../../@types/pokemon";
import { Container } from "./styles";
import pokeball from "../../assets/pokeball.png";
import { TypeCard } from "../TypeCard";

type Props = {
  pokemon: Partial<Pokemon>;
};

export function PokemonCard({ pokemon }: Props) {
  return (
    <Container>
      <img
        src={pokemon.sprites?.other["official-artwork"].front_default || pokeball}
        alt={pokemon.name}
      />

      <strong>
        #{pokemon.id} {pokemon.name}
      </strong>

      <div className="boxTypes">
        {pokemon.types?.map(({ type }) => {
          return <TypeCard type={type.name} key={type.name} />;
        })}
      </div>
    </Container>
  );
}
