const poke_container = document.querySelector("#poke-container");
const pokemon_count = 800;
const colors = {
  bug: "#ACC833",
  dark: "#707785",
  dragon: "#0583BB",
  electric: "#FAE276",
  fairy: "#F5AAE5",
  fighting: "#E5444B",
  fire: "#FFAF4A",
  flying: "#A7C1EF",
  ghost: "#7C73D8",
  grass: "#58C47E",
  ground: "#D49A6C",
  ice: "#94DDD9",
  normal: "#AAA79E",
  poison: "#C95FD6",
  psychic: "#FFA69B",
  rock: "#D7CD92",
  steel: "#A0AAB0",
  water: "#73C7E5",
};
const main_types = Object.keys(colors);

const fetchPokemons = async () => {
  try {
    for (let i = 1; i <= pokemon_count; i++) {
      await getPokemons(i);
    }
  } catch (error) {
    console.log(error);
  }
};

const getPokemons = async (id) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resp = await fetch(url);
    const data = await resp.json();
    createPokemonCard(data);
  } catch (error) {
    console.log(error);
  }
};

const createPokemonCard = (poke) => {
  const card = document.createElement("div");
  card.classList.add("pokemon");

  const name = poke.name.charAt(0).toUpperCase() + poke.name.slice(1);
  const id = poke.id.toString().padStart(3, "0");
  const poke_types = poke.types.map((type) => type.type.name);
  const type = main_types.find((type) => poke_types.indexOf(type) > -1);
  const color = colors[type];

  card.style.backgroundColor = color;

  const pokemon_innerHTML = `
        <div class="img-container">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png"
            alt="${name}"
          />
        </div>
        <div class="info">
          <span class="number">${id}</span>
          <h3 class="name">${name}</h3>
          <small class="type">Type: <span>${type}</span></small>
        </div>`;

  card.innerHTML = pokemon_innerHTML;
  poke_container.appendChild(card);
};
fetchPokemons();
