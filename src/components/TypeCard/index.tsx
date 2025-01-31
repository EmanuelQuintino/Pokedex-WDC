import { PokemonType } from "../../@types/pokemon";
import { Container } from "./styles";

export type TypeProps = {
  type: PokemonType;
  size?: number;
};

export function TypeCard({ type, size = 10 }: TypeProps) {
  return (
    <Container type={type} size={size}>
      {type}
    </Container>
  );
}
