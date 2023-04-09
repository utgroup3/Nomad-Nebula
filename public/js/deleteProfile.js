const deleteProfileBtn = document.getElementById('deleteProfileBtn');

if (deleteProfileBtn) {
  deleteProfileBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const confirmed = confirm('Are you sure you want to delete your profile? This action cannot be undone.');

    if (confirmed) {
      // Get the user_id from the hidden input field
      const user_id = document.getElementById('user_id').value;

      try {
        const response = await axios.delete(`/api/users/${user_id}`);

        if (response.status === 200) {
          alert('Your profile has been deleted.');
          // Redirect to the home page or a logout page
          window.location.href = '/';
        } else {
          alert('An error occurred while deleting your profile. Please try again.');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while deleting your profile. Please try again.');
      }
    }
  });
}