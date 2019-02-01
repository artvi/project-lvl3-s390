export default (state) => {
  const { input, inputIsValid } = state;
  const inputField = document.getElementById('rss-link');
  const button = document.querySelector('button');


  const validationClasses = {
    field: {
      true: 'is-valid',
      false: 'is-invalid',
    },
    button: {
      true: 'btn-outline-success',
      false: 'btn-outline-dark',
    },
  };

  const fieldClassToAdd = validationClasses.field[inputIsValid];
  const fieldClassToRemove = validationClasses.field[!inputIsValid];
  inputField.classList.remove(fieldClassToRemove);
  inputField.classList.add(fieldClassToAdd);
  if (input.length === 0) {
    inputField.classList.remove(fieldClassToAdd, fieldClassToRemove);
  }

  const buttonClassToAdd = validationClasses.button[inputIsValid];
  const buttonClassToRemove = validationClasses.button[!inputIsValid];
  button.classList.remove(buttonClassToRemove);
  button.classList.add(buttonClassToAdd);
  button.disabled = !inputIsValid;
};
