import {
  get,
  set,
  entries,
} from 'https://cdn.jsdelivr.net/npm/idb-keyval@6/+esm';

class App {
  constructor() {
    this.initializeForm();
    this.listValues();
  }

  initializeForm() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log('form submitted');
      this.save({ key: form.key.value, value: form.keyValue.value });
      this.listValues();
      form.reset();
      form.key.disabled = false;
      form.key.focus();
    });
  }

  async save({ key, value }) {
    console.log('saving data...', key, value);
    await new Promise((resolve) => setTimeout(resolve, 500));
    set(key, value).then(() => console.log('value saved'));
  }

  async listValues() {
    console.log('listing data...');
    const keyValueList = await entries();
    if (!keyValueList.length) {
      this.resetTable();
      return;
    }
    const allValues = keyValueList.map(this.toHTML).join('');
    this.addToHTML(allValues);
  }

  toHTML(entry) {
    const [key, value] = entry;
    const html = `
      <tr>
        <th scope="row">${key}</th>
        <td>${value}</td>
        <td style="width: 30px">
          <span style="cursor: pointer" onclick="app.edit('${key}')">✏️</span>
        </td>
        <td style="width: 30px">
          <span style="cursor: pointer" onclick="app.delete('${key}')">🗑️</span>
        </td>
      </tr>
    `;
    return html;
  }

  addToHTML(allValues) {
    console.log('adding to HTML...');
    const listValues = document.getElementById('listValues');
    listValues.innerHTML = '';
    listValues.insertAdjacentHTML('beforeend', allValues);
  }

  resetTable() {
    const listValues = document.getElementById('listValues');
    listValues.innerHTML = '<td colSpan="4">No data available</td>';
  }

  async edit(key) {
    console.log(`editing the key: ${key}`);
    const form = document.querySelector('form');
    const value = await get(key);
    form.key.disabled = true;
    form.key.value = key;
    form.keyValue.value = value;
  }

  delete(key) {
    if (confirm('Are you sure?')) {
      // window.localStorage.removeItem(key);
      // this.listValues();
    }
  }
}

// TODO: edit values: fill the form, alter the value and save
// TODO: use html5 dialog instead of confirm

const app = new App();
// this is ugly, try to avoid it as much as possible
window.app = app;
