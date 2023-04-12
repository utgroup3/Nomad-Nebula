// Define an async function to handle the delete request when the delete button is clicked
async function deleteFormHandler(event) {
  event.preventDefault();
  event.stopPropagation();

  // Get the comment ID from the button's dataset
  const commentId = event.currentTarget.getAttribute('data-comment-id');

  // Send the delete request to the server using the comment ID
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
    credentials: 'same-origin' // Include the credentials to access session data
  });

  // Handle the response status code
  if (response.status === 404) {
    // If the status code is 404, show an alert that the user is a hacker
    alert("You are a hacker")
  } else if (response.status === 403) {
    // If the status code is 403, show an alert that the user is not authorized to delete the comment
    alert("You are not authorized to delete this comment");
  } else if (response.ok) {
    // If the response is successful, reload the page to update the comments
    document.location.reload();
  }
}

// Find all delete buttons and add an event listener for each one that calls the deleteFormHandler function
document.querySelectorAll('.delete-comment').forEach((button) => {
  if (button) {
    button.addEventListener('click', deleteFormHandler);
  }
});