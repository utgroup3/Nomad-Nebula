const form = document.querySelector('.edit-profile-form form');

if (form) {
  form.onsubmit = function(event) {
    event.preventDefault();

    let data = new FormData(form);

    axios({
      method: 'post',
      url: 'api/users/edit-profile',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {
        if (response.status === 203) {
          window.open('/profile', '_self');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}