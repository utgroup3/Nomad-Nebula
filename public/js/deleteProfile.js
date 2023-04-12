// Get the delete profile button
const deleteProfileBtn = document.getElementById('deleteProfileBtn');

// If the button exists, add a click event listener
if (deleteProfileBtn) {
  deleteProfileBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Ask the user to confirm the deletion
    const confirmed = confirm('Are you sure you want to delete your profile? This action cannot be undone.');

    if (confirmed) {
      // Get the user_id from the hidden input field
      const user_id = document.getElementById('user_id').value;

      try {
         // Send a DELETE request to the server with the user ID
        const response = await axios.delete(`/api/users/${user_id}`);

        // If the response status is 200, show a success message and redirect the user
        if (response.status === 200) {
          alert('Your profile has been deleted.');
          // Redirect to the home page or a logout page
          window.location.href = '/';
        } else {
           // Otherwise, show an error message
          alert('An error occurred while deleting your profile. Please try again.');
        }
      } catch (error) {
        // If there is an error, log it to the console and show an error message
        console.error(error);
        alert('An error occurred while deleting your profile. Please try again.');
      }
    }
  });
}