const hideCommentLinks = document.querySelectorAll('.hide-comment');

hideCommentLinks.forEach((hideCommentLink) => {
  hideCommentLink.addEventListener('click', (event) => {
    const commentId = event.target.dataset.commentId;
    const commentContainer = document.querySelector(`[data-comment-id="${commentId}"]`).closest('.comment-container');
    commentContainer.style.display = 'none';

    const postContainer = event.target.closest('.post-container');
    const commentsContainer = postContainer.querySelector('.comments-container');
    const commentsTitle = commentsContainer.querySelector('.comlabel');
    const visibleComments = commentsContainer.querySelectorAll('.comment-container:not([style*="display: none"])');

    if (visibleComments.length === 1) {
      commentsTitle.style.display = 'none';
    }
  });
});