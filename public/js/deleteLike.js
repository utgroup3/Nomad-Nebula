const likeBtns = document.querySelectorAll('.like-btn');

likeBtn.addEventListener('click', async function() {
    const postContainer = this.closest('.post-container');
    const post_id = postContainer.dataset.postId;

    if (heart.textContent === likedHeart) {
    // Send a DELETE request to the server to "unlike" the post
    const response = await fetch(`/api/likes/${post_id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post_id: post_id, isLiked: false })
    });

    if (response.ok) {
        console.log('Unliked successfully');
        // remove the post from the UI if it is successfully deleted from the backend
        if (response.status === 204) {
        postContainer.remove();
        }
    } else {
        alert(response.statusText);
    }
}
})