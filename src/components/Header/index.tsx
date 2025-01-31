import { Container } from "./styles";
import logo from "../../assets/pokemon-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";

type Input = {
  pokemonName: string;
};

export function Header() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Input> = (data) => {
    console.log(data.pokemonName);
    navigate(`/search?q=${data.pokemonName}`);
  };

  return (
    <Container>
      <h1 className="srOnly">Pokédex - Reprograma Jucás</h1>

      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section>
          <label htmlFor="pokemonName" className="srOnly">
            Pesquisar Pokémon
          </label>

          <input
            type="text"
            id="pokemonName"
            placeholder="Pesquisar Pokémon"
            {...register("pokemonName", { required: "Informe o nome do Pokémon" })}
          />

          <span className="inputError">{errors.pokemonName?.message}</span>
        </section>

        <button>Pesquisar</button>
      </form>
    </Container>
  );
}
