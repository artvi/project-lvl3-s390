export default (state) => {
  const { input, inputIsValid, loading } = state;
  const inputField = document.getElementById('rss-link');
  const button = document.getElementById('add-link-butt');

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
    inputField.value = '';
  }

  const buttonClassToAdd = validationClasses.button[inputIsValid];
  const buttonClassToRemove = validationClasses.button[!inputIsValid];
  button.innerHTML = loading ?
    '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> loading your feed'
    : 'Add to feed';

  button.classList.remove(buttonClassToRemove);
  button.classList.add(buttonClassToAdd);
  button.disabled = !inputIsValid || loading;
};
