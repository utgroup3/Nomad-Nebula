const updateCommentModal = document.getElementById('update-comment-modal');
const updateCommentForm = document.getElementById('update-comment-form');
const updateCommentTextarea = document.getElementById('update-comment-textarea');
const submitUpdateCommentButton = document.getElementById('submit-update-comment');
const cancelUpdateCommentButton = document.getElementById('cancel-update-comment');
const closeButton = updateCommentModal.querySelector('.delete');

let currentCommentId;
let currentCommentTextElement;

function closeModal() {
  updateCommentModal.classList.remove('is-active');
}

closeButton.addEventListener('click', closeModal);
cancelUpdateCommentButton.addEventListener('click', closeModal);

document.addEventListener('click', async (event) => {
  if (event.target.matches('.update-comment')) {
    event.preventDefault();

    // Get current comment's ID and text
    currentCommentId = event.target.dataset.commentId;
    const commentContainer = event.target.closest('.comment-container');
    currentCommentTextElement = commentContainer.querySelector('.com');
    const currentCommentText = currentCommentTextElement.textContent.trim();

    // Set text of textarea and show modal
    updateCommentTextarea.value = currentCommentText;
    updateCommentModal.classList.add('is-active');
  }
});

submitUpdateCommentButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const updatedCommentText = updateCommentTextarea.value.trim();

  if (updatedCommentText === '') {
    return;
  }

  try {
    const response = await fetch(`/api/comments/${currentCommentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: updatedCommentText }),
    });

    if (response.ok) {
      const updatedComment = await response.json();
      currentCommentTextElement.textContent = updatedComment.comment;
      closeModal();
    } else {
      alert('Error updating comment.');
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
});
