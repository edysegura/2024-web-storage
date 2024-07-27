import getZipCodeDatabase from './database.js';

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

const form = document.querySelector('form');
form.addEventListener('submit', async () => {
  const zipCodeData = await getCepData(form.cep.value);
  fillTable(zipCodeData);
});

// TODO: improve this code
// TODO: if not find in the indexedDB fetch from the network and save into the table
// TODO: format CEP data to show in the table
