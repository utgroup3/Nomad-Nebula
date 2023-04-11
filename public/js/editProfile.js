// Select the edit profile form
const form = document.querySelector('.edit-profile-form form');

// Check if the form exists
if (form) {
    // Prevent the default form submission behavior
  form.onsubmit = function(event) {
    event.preventDefault();

    // Create a new FormData object with the form data
    let data = new FormData(form);

    // Send a POST request to the server to update the user profile
    axios({
      method: 'post',
      url: 'api/users/edit-profile',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {
        // If the update was successful, redirect to the profile page
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