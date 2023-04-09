const commentFormHandler = async (event) => {
  event.preventDefault();

  const postContainer = event.target.closest('.post-container');
  const comment = postContainer.querySelector('.comment-textarea').value.trim();
  const post_id = postContainer.dataset.postId;

  if (comment) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment: comment, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Comment added successfully');
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const toggleCommentFormButtons = document.querySelectorAll('.toggle-comment-form');

  toggleCommentFormButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const postContainer = event.target.closest('.post-container');
      const commentForm = postContainer.querySelector('.comment-form');
      commentForm.style.display = commentForm.style.display === 'none' ? 'block' : 'none';
    });
  });

  const submitCommentButtons = document.querySelectorAll('.submit-comment');
  submitCommentButtons.forEach((button) => {
    button.addEventListener('click', commentFormHandler);
  });
});