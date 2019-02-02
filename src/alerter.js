export default (state) => {
  const { errors } = state;
  const alert = `<div class="alert alert-danger" role="alert">
     ${errors[0]}
     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
    </div>`;
  const alertContainer = document.createElement('div');
  alertContainer.innerHTML = alert;
  document.body.prepend(alertContainer);
};
