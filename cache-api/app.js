const button = document.getElementById('fetchData');

button.addEventListener('click', () => {
  console.count('👀Button clicked!');
  fetchData();
  console.log('What? I was called first? 🤔');
});

async function fetchData() {
  const endpoint = 'https://swapi.dev/api/people/1';
  const response = await fetch(endpoint);
  const character = await response.json();
  console.log(character);
}
