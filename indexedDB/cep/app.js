import { installData } from './install-data.js';

const linkToInstall = document.querySelector("a[href='#']");
linkToInstall.addEventListener('click', async () => {
  console.log('install data...');
  alert('Will install');
  // button.disabled = true;
  // button.setAttribute('aria-busy', true);
  // await installData();
  // button.removeAttribute('aria-busy');
});

const form = document.querySelector('form');
form.addEventListener('submit', () => {
  alert('IM here!');
});
