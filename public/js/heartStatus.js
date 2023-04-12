// Select all like buttons on the page
const likeBtns = document.querySelectorAll('.like-btn');

// Iterate over each like button
likeBtns.forEach(function (likeBtn) {
  // Select the heart icon element inside the like button
  const heart = likeBtn.querySelector('.heart.liked') || likeBtn.querySelector('.heart');
  // Define the heart icons for when it is liked and unliked
  const likedHeart = '❤️';
  const unlikedHeart = '🤍';

  likeBtn.addEventListener('click', async function () {
    const postContainer = this.closest('.post-container');
    const post_id = postContainer.dataset.postId;

    if (heart.classList.contains('liked')) {
      heart.classList.remove('liked');
      heart.textContent = unlikedHeart;
    } else {
      heart.classList.add('liked');
      heart.textContent = likedHeart;
    }

    // When heart is CLICKED -- if the heart is currently 'liked' then POST it with isLiked = true to the backend. Else, if it is currently not 'liked', POST it with isLiked = false to the backend
    const isLiked = heart.classList.contains('liked');
    const response = await fetch('/api/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post_id: post_id, isLiked: isLiked }),
    });

    // If the like request is successful, update the UI
    if (response.ok) {
      console.log(isLiked ? 'Liked successfully' : 'Unliked successfully');

       // If the post was unliked and the user is on the user likes page, remove the post from the page
      const pageContainer = document.querySelector('.community-posts');
      if (!isLiked && pageContainer.classList.contains('user-likes-page')) {
        postContainer.remove();
        location.reload();
      }
    } else {
      // If the like request fails, show an error alert
      alert(response.statusText);
    }
  });
});
