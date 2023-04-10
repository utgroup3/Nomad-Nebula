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

// This portion of code is to incorporate a filelist beside image upload

const fileInput = document.querySelector('input[type="file"]');
const fileUploadLabel = document.querySelector('.file-upload-label');

fileInput.addEventListener('change', (event) => {
  // Get the selected file name
  console.log(fileInput.files)
  const fileName = fileInput.files[0].name;

  // Set the file upload label to the selected file name
  fileUploadLabel.textContent = fileName;
});