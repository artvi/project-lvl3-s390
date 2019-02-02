import $ from 'jquery';

export default (state) => {
  const { error } = state;
  if (error === null) {
    $('.alert').alert('close');
  } else {
    const alert = `<div class="alert alert-danger" role="alert">
       ${error}
       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
      </div>`;
    const alertContainer = document.createElement('div');
    alertContainer.innerHTML = alert;
    document.body.prepend(alertContainer);
  }
};
