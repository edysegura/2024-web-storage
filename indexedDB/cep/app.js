import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm';

async function extractCEPsOnly() {
  const response = await fetch('./CEPs.txt');
  const textData = await response.text();
  const lines = textData.split('\n');
  const extractCEP = (line) => line.split(';')[3];
  const cepList = lines.map(extractCEP);
  return cepList;
}

async function fetchCEPData(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();
  return data;
}

function cepFactory(cepData) {
  return {
    zipCode: cepData.cep.replace('-', ''),
    state: cepData.uf,
    location: cepData.localidade,
    publicPlace: cepData.logradouro,
    neighborhood: cepData.bairro,
    phoneCode: cepData.ddd,
  };
}

export async function installData() {
  const cepList = await extractCEPsOnly();
  const promiseList = await Promise.allSettled(cepList.map(fetchCEPData));
  const onlyFulfilled = (result) => result.status === 'fulfilled';
  const onlyValues = (result) => result.value;
  const cepListData = promiseList.filter(onlyFulfilled).map(onlyValues);
  const cepMappedList = cepListData.map(cepFactory);
  const db = new Dexie('zipCodeDatabase');

  db.version(2).stores({
    zipCode: '&zipCode,location',
  });

  return db.zipCode.bulkPut(cepMappedList);
}
