const commentLinks = document.querySelectorAll('.post-action-item');

// Add a click event listener to each comment link
commentLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
     // Check if clicked element is a comment link
    if (event.target.textContent === 'Comments') {
      // Get the parent post container
      const postContainer = event.target.closest('.post-container');
      // Get the comments container within the post container
      const commentsContainer = postContainer.querySelector('.comments-container');
      // Get the comments title within the comments container
      const commentsTitle = commentsContainer.querySelector('.comlabel');
      // Get any comments within the comments container that are currently hidden
      const hiddenComments = commentsContainer.querySelectorAll('.comment-container[style*="display: none"]');

      // If comments container is currently hidden
      if (commentsContainer.style.display === 'none') {
        // Show the comments container and comments title
        commentsContainer.style.display = 'block';
        commentsTitle.style.display = 'block';
      } else {
        // Hide the comments container and comments title
        commentsContainer.style.display = 'none';
        commentsTitle.style.display = 'none';
      }

      // Show any hidden comments within the comments container
      hiddenComments.forEach((comment) => {
        comment.style.display = 'block';
      });
    }
  });
});