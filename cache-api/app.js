const button = document.getElementById('fetchData');
const header = document.querySelector('header');
const image = document.querySelector('img');

button.addEventListener('click', async () => {
  console.count('👀 Button clicked!');
  setLoadingStatus();
  const poke = await fetchPokeData({
    pokeId: randomPokeNumber(),
  });
  showCharacterData(poke);
});

function setLoadingStatus() {
  header.textContent = 'loading...';
}

function randomPokeNumber() {
  return Math.floor(Math.random() * 151 + 1);
}

function showCharacterData(pokemon) {
  header.textContent = pokemon.name;
  image.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
}

async function fetchPokeData({ pokeId }) {
  const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
  console.log(`[fetchCharacterData] #${pokeId}`);
  const response = await fetch(endpoint);
  const pokemon = await response.json();
  console.log(`🤺 Character name (${pokeId}): ${pokemon.name}`);
  return pokemon;
}
