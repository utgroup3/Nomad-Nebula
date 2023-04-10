const commentLinks = document.querySelectorAll('.post-action-item');

commentLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.target.textContent === 'Comments') {
      const postContainer = event.target.closest('.post-container');
      const commentsContainer = postContainer.querySelector('.comments-container');
      const commentsTitle = commentsContainer.querySelector('.comlabel');
      const hiddenComments = commentsContainer.querySelectorAll('.comment-container[style*="display: none"]');

      if (commentsContainer.style.display === 'none') {
        commentsContainer.style.display = 'block';
        commentsTitle.style.display = 'block';
      } else {
        commentsContainer.style.display = 'none';
        commentsTitle.style.display = 'none';
      }

      hiddenComments.forEach((comment) => {
        comment.style.display = 'block';
      });
    }
  });
});