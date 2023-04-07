const form = document.querySelector('.edit-profile-form form');

if (form) {
  form.onsubmit = function(event) {
    event.preventDefault();

    let data = new FormData(form);
    let object = {};
    data.forEach((value, key) => {
      object[key] = value;
    })

    fetch("api/users/edit-profile", {
      method: 'POST',
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(object)
    })
    .then(response => {
      if (response.status === 203) {
        window.open('/profile', '_self')
      }
    })
  }
}