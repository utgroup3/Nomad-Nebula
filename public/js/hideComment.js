const hideCommentLinks = document.querySelectorAll('.hide-comment');

// Add event listener to each "hide-comment" element
hideCommentLinks.forEach((hideCommentLink) => {
  hideCommentLink.addEventListener('click', (event) => {
    // Get the ID of the comment that should be hidden
    const commentId = event.target.dataset.commentId;
    // Find the container element of the comment and hide it
    const commentContainer = document.querySelector(`[data-comment-id="${commentId}"]`).closest('.comment-container');
    commentContainer.style.display = 'none';

    // Get the container for all comments in the post
    const postContainer = event.target.closest('.post-container');
    const commentsContainer = postContainer.querySelector('.comments-container');
    // Get the container's title element
    const commentsTitle = commentsContainer.querySelector('.comlabel');
     // Get all visible comments in the container
    const visibleComments = commentsContainer.querySelectorAll('.comment-container:not([style*="display: none"])');

     // If the comment that was just hidden was the last visible comment in the container, hide the container's title
    if (visibleComments.length === 1) {
      commentsTitle.style.display = 'none';
    }
  });
});