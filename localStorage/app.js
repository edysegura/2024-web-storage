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
      form.key.focus();
    });
  }

  save({ key, value }) {
    console.log('saving data...');
    window.localStorage.setItem(key, value);
  }

  listValues() {
    console.log('listing data...');
    const ls = window.localStorage;
    if (!ls.length) return;
    const lsKeys = Object.keys(ls);
    const allValues = lsKeys.map(this.toHTML);
    console.log(allValues);
  }

  toHTML(key) {
    const value = window.localStorage.getItem(key);
    const html = `<p>${key}: ${value}</p>`;
    return html;
  }
}

new App();
