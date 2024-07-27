import getZipCodeDatabase from './database.js';

async function getCepData(zipCode) {
  const db = await getZipCodeDatabase();
  let zipCodeData = await db.zipCode.get(zipCode);
  if (zipCodeData) return zipCodeData;
  const { getFromNetwork } = await import('./install-data.js');
  zipCodeData = await getFromNetwork(zipCode);
  return zipCodeData;
}

function fillTable(zipCodeData) {
  console.log(zipCodeData);
  // this is necessary because we don't have phone number for now
  delete zipCodeData.phoneCode;
  const addToTheTable = (key) => {
    console.log(`${key}: ${zipCodeData[key]}`);
    const tdElement = document.getElementById(key);
    tdElement.textContent = zipCodeData[key];
  };
  Object.keys(zipCodeData).forEach(addToTheTable);
}

const linkToInstall = document.querySelector("a[href='#']");
linkToInstall.addEventListener('click', async () => {
  console.log('install data...');
  const { installData } = await import('./install-data.js');
  console.log(installData);
  alert('Will install');
  // button.disabled = true;
  // button.setAttribute('aria-busy', true);
  // await installData();
  // button.removeAttribute('aria-busy');
});

const form = document.querySelector('form');
const submitButton = document.querySelector("button[type='submit']");
form.addEventListener('submit', async () => {
  // set load true
  submitButton.setAttribute('aria-busy', true);
  submitButton.disabled = true;
  const zipCodeData = await getCepData(form.cep.value.replace('-', ''));
  // set load off
  submitButton.setAttribute('aria-busy', false);
  submitButton.disabled = false;
  fillTable(zipCodeData);
});

// TODO: improve this code
// TODO: format CEP data to show in the table
