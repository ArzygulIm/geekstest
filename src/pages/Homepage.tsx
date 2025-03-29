import { useState, useEffect } from "react";

interface Pokemon {
  name: string;
  url?: string;
}
function HomePage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemon, setPokemon] = useState<Pokemon>({ name: "", url: "" });

  const getPokemons = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setPokemons(json.results);
      })
      .catch((error) => console.log(error.message));
  };

  const getPokemon = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/1/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setPokemon(json);
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    getPokemons();
    getPokemon();
  }, []);
  console.log(pokemon);

  return (
    <section id="Home">
      <div className="container">
        <div className="row">
          {pokemons.map((el, index) => {
            return (
              <div className="col-6" key={index}>
                <div className="pokemonbox">
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${el.url
                      ?.slice(34)
                      .replace("/", "")}.png`}
                    alt=""
                  />
                  <div>
                    <h6>{el.name}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HomePage;
