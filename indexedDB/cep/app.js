import Dexie from 'https://cdn.jsdelivr.net/npm/dexie@4.0.8/+esm';

const response = await fetch(`https://viacep.com.br/ws/37537144/json/`);
const data = await response.json();
console.log('response data: ', data);

const db = new Dexie('zipCodeDatabase');

db.version(1).stores({
  zipCode: '++id,cep,localidade',
});

// {
//   "cep": "37537-144",
//   "logradouro": "Rua Três",
//   "complemento": "",
//   "unidade": "",
//   "bairro": "Viana",
//   "localidade": "Santa Rita do Sapucaí",
//   "uf": "MG",
//   "ibge": "3159605",
//   "gia": "",
//   "ddd": "35",
//   "siafi": "5191"
// }

db.zipCode.add({
  zipCode: data.cep.replace('-', ''),
  state: data.uf,
  location: data.localidade,
  neighborhood: data.bairro,
  phoneCode: data.ddd,
});
