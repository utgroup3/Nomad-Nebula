async function deleteFormHandler(event) {
  event.preventDefault();
  event.stopPropagation();

  const commentId = event.currentTarget.getAttribute('data-comment-id');
  const userId = event.currentTarget.getAttribute('data-user-id');

  // Check if the user is logged in
  const response = await fetch(`/api/users/${userId}`);
  const user = await response.json();

  if (user) {
    // User is logged in, send the delete request
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'DELETE'
    });

    if (response.status === 404) {
      alert("You are a hacker")
      //document.location.reload();
    } else if (response.status === 403) {
      // User is not logged in, show the login modal
      const modal = new bootstrap.Modal(document.getElementById('loginModal'), {});
      modal.show();
    } else if (response.ok) {
      document.location.reload();
    }
  }
}

fetch(`/api/comments/me`)
.then(response => response.text())
.then(user => {
  document.querySelectorAll('.delete-comment-btn').forEach((button) => {
    if (button) {
      const userId = button.getAttribute('data-user-id');
      if (userId != user) {
        button.disabled = true;
        button.classList.add("disabled");
      } else {
        button.addEventListener('click', deleteFormHandler);
      }
    }
  })
});