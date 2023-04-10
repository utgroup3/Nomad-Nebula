// Handle click event on post links
document.querySelectorAll('.post-link').forEach((postLink) => {
  postLink.addEventListener('click', (event) => {

    // Prevent only the textarea to not toggle the hidden classlist
    const isTextArea = event.target.matches('textarea') || event.target.closest('textarea') !== null;
    if(isTextArea) {
      return;
    }
    
    event.preventDefault();
    const buttonsContainer = event.currentTarget.querySelector('.buttons');
    buttonsContainer.classList.toggle('is-hidden');
  });
});

// Handle save changes button click
document.querySelectorAll('.save-changes-btn').forEach((saveBtn) => {
  saveBtn.addEventListener('click', async (event) => {
    const postId = event.currentTarget.closest('.post-link').dataset.postId;
    const title = event.currentTarget.closest('.card').querySelector('.card-header-title').innerText;
    // const post_content = event.currentTarget.closest('.card').querySelector('.content').innerText;
    var textarea = document.querySelector('.edit-textarea');

    // Make API request to update post
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title: title, content: textarea.value }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.ok) {
        window.location.href = '/profile';
      } else {
        throw new Error('Failed to update post');
      }
    } catch (error) {
      console.error(error);
    }
  });
});

// Handle delete post button click
document.querySelectorAll('.delete-btn').forEach((deleteBtn) => {
  deleteBtn.addEventListener('click', async (event) => {
    const postId = event.currentTarget.closest('.post-link').dataset.postId;

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
});

// // Handle form submission
// const editPostForm = document.querySelector('.edit-post-form');
// editPostForm.addEventListener('submit', async (event) => {
//   event.preventDefault();
//   const title = editPostForm.querySelector('[name="post-title"]').value;
//   const post_content = editPostForm.querySelector('[name="post-body"]').value;
//   const postId = editPostForm.dataset.postId;

//   // Make API request to update post
//   try {
//     const response = await fetch(`/api/posts/${postId}`, {
//       method: 'PUT',
//       body: JSON.stringify({ title, post_content }),
//       headers: { 'Content-Type': 'application/json' }
//     });
//     if (response.ok) {
//       window.location.href = '/profile';
//     } else {
//       throw new Error('Failed to update post');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

// // Handle delete post button click
// const deletePostButton = document.querySelector('.delete-post-btn');
// deletePostButton.addEventListener('click', async () => {
//   const postId = editPostForm.dataset.postId;

//   // Make API request to delete post
//   try {
//     const response = await fetch(`/api/posts/${postId}`, {
//       method: 'DELETE'
//     });
//     if (response.ok) {
//       window.location.href = '/profile';
//     } else {
//       throw new Error('Failed to delete post');
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });