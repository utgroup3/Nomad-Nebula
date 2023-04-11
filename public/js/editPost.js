const editForm = document.querySelector('.edit-post-form');

if (editForm) {
  editForm.onsubmit = function(event) {
    event.preventDefault();

    const postId = document.querySelector('#post_id').value;
    const title = document.querySelector('input[name="title"]').value;
    const content = document.querySelector('textarea[name="content"]').value;
    const image = document.querySelector('input[type="file"]').files[0];

    const data = new FormData();
    data.append('title', title);
    data.append('content', content);
    if (image) {
      data.append('image', image);
    }

    axios({
      method: 'put',
      url: `/api/posts/${postId}`,
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

  // This portion of code is to incorporate a filelist beside image upload
  const fileInput = document.querySelector('input[type="file"]');
  const fileUploadLabel = document.querySelector('.file-upload-label');

  fileInput.addEventListener('change', (event) => {
    // Get the selected file name
    const fileName = event.target.files[0].name;

    // Set the file upload label to the selected file name
    fileUploadLabel.textContent = fileName;
  });
}

// Handle delete post button click
document.querySelector('#deleteProfileBtn').addEventListener('click', async (event) => {
  event.preventDefault();

  const postIdInput = document.querySelector('#post_id');
  console.log('postIdInput:', postIdInput);
  const postId = postIdInput.value;
  console.log(`postId: ${postId}`);

  // Make API request to delete post
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      window.location.href = '/profile';
    } else {
      throw new Error('Failed to delete post');
    }
  } catch (error) {
    console.error(error);
  }
});