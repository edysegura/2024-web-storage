const button = document.getElementById('fetchData');
const header = document.querySelector('header');
const output = document.querySelector('output');

button.addEventListener('click', async () => {
  console.count('👀 Button clicked!');
  setLoadingStatus();
  const poke = await fetchPokeData({ pokeId: 1 });
  showCharacterData(poke);
});

function setLoadingStatus() {
  output.textContent = header.textContent = 'loading...';
}

function showCharacterData(character) {
  header.textContent = character.name;
  output.textContent = JSON.stringify(character, null, 2);
}

async function fetchPokeData({ pokeId }) {
  const endpoint = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
  console.log(`[fetchCharacterData] #${pokeId}`);
  const response = await fetch(endpoint);
  const pokemon = await response.json();
  console.log(`🤺 Character name (${pokeId}): ${pokemon.name}`);
  return pokemon;
}
