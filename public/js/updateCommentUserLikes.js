document.addEventListener('click', async (event) => {
  if (event.target.matches('.update-comment')) {
    event.preventDefault();

    const commentId = event.target.dataset.commentId;
    const commentContainer = event.target.closest('.comment-container');
    const commentTextElement = commentContainer.querySelector('p');
    const currentCommentText = commentTextElement.textContent.trim();

    const modal = document.getElementById('update-comment-modal');
    const textarea = document.getElementById('update-comment-textarea');
    textarea.value = currentCommentText;
    modal.classList.add('is-active');

    document.getElementById('submit-update-comment').onclick = async () => {
      const updatedCommentText = textarea.value.trim();
      if (updatedCommentText === '') {
        return;
      }
      modal.classList.remove('is-active');
      updateComment(updatedCommentText, commentId, commentTextElement);
    };

    document.getElementById('cancel-update-comment').onclick = () => {
      modal.classList.remove('is-active');
    };

    document.querySelector('.modal-background').onclick = () => {
      modal.classList.remove('is-active');
    };

    document.querySelector('.delete').onclick = () => {
      modal.classList.remove('is-active');
    };
  }
});

async function updateComment(updatedCommentText, commentId, commentTextElement) {
  try {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: updatedCommentText }),
    });

    if (response.ok) {
      const updatedComment = await response.json();
      commentTextElement.textContent = updatedComment.comment;
    } else {
      alert('Error updating comment.');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}
