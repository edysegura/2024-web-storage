const button = document.getElementById('fetchData');
const header = document.querySelector('header');
const image = document.querySelector('img');

const CACHE_KEY = 'MY-POKE-CACHE-ID';

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
  const pokemon =
    (await fetchFromCache(endpoint)) || (await fetchFromNetwork(endpoint));
  return pokemon;
}

async function fetchFromNetwork(endpoint) {
  const response = await fetch(endpoint);
  if (response.ok) {
    addToCache(endpoint, response.clone());
    return response.json();
  }
  throw new Error(`Not able to request: ${endpoint}`);
}

async function fetchFromCache(endpoint) {
  const cache = await caches.open(`${CACHE_KEY}-JSON`);
  const response = await cache.match(endpoint);
  return response && response.json();
}

async function addToCache(key, response) {
  const jsonCache = await caches.open(`${CACHE_KEY}-JSON`);
  const imagesCache = await caches.open(`${CACHE_KEY}-IMAGES`);
  jsonCache.put(key, response);
  imagesCache.add(
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${key
      .split('/')
      .pop()}.png`
  );
}
