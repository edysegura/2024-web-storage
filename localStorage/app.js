class App {
  constructor() {
    this.initializeForm();
  }

  initializeForm() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log('form submitted');
    });
  }
}

new App();
