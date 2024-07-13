class App {
  constructor() {
    this.initializeForm();
  }

  initializeForm() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log('form submitted');
      console.log(form.key.value);
      console.log(form.keyValue.value);
      form.reset();
      form.key.focus();
    });
  }
}

new App();
