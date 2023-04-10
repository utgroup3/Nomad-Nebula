async function deleteFormHandler(event) {
  event.preventDefault();
  event.stopPropagation();

  const commentId = event.currentTarget.getAttribute('data-comment-id');

  // Send the delete request
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
    credentials: 'same-origin' // Include the credentials to access session data
  });

  if (response.status === 404) {
    alert("You are a hacker")
  } else if (response.status === 403) {
    alert("You are not authorized to delete this comment");
  } else if (response.ok) {
    document.location.reload();
  }
}

document.querySelectorAll('.delete-comment').forEach((button) => {
  if (button) {
    button.addEventListener('click', deleteFormHandler);
  }
});