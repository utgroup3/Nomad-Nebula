const likeBtns = document.querySelectorAll('.like-btn');

likeBtns.forEach(function (likeBtn) {
  const heart = likeBtn.querySelector('.heart.liked') || likeBtn.querySelector('.heart');
  const likedHeart = '❤️';
  const unlikedHeart = '🤍';

  likeBtn.addEventListener('mouseover', () => {
    if (!heart.classList.contains('liked')) {
      heart.textContent = '💘';
    }
  });

  likeBtn.addEventListener('mouseout', () => {
    if (!heart.classList.contains('liked')) {
      heart.textContent = unlikedHeart;
    }
  });

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

    if (response.ok) {
      console.log(isLiked ? 'Liked successfully' : 'Unliked successfully');
    } else {
      alert(response.statusText);
    }
  });
});
