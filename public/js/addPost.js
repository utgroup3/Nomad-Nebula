const form = document.querySelector('.new-post-form');

if (form) {
  form.onsubmit = function(event) {
    event.preventDefault();

    let data = new FormData(form);

    axios({
      method: 'post',
      url: 'api/posts',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {

        if (response.status === 200) {
          window.open('/profile', '_self');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}