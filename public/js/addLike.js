const likeBtns = document.querySelectorAll('.like-btn');

likeBtns.forEach(function(likeBtn) {
  const heart = likeBtn.querySelector('.heart');
  const likedHeart = '💖';
  const unlikedHeart = '🤍';

  likeBtn.addEventListener('mouseover', () => {
    // Mouseover heart to change the heart. If heart is 'liked', then do not apply the mouseover
    if (heart.textContent !== likedHeart) {
        heart.textContent = '💘';
      }
  })

  likeBtn.addEventListener('mouseout', () => {

    // if heart is 'liked', then do not apply mouseout
    if (heart.textContent !== likedHeart) {
        heart.textContent = unlikedHeart;
      }
  })

  likeBtn.addEventListener('click', function() {
    if (heart.textContent === likedHeart) {
      heart.textContent = unlikedHeart;
    } else {
      heart.textContent = likedHeart;
    }
  });


 
  likeBtn.addEventListener('click', async function() {
    const postContainer = this.closest('.post-container');
    const post_id = postContainer.dataset.postId
  
    // When heart is CLICKED -- if the heart is currently 'liked' then DELETE it from the backend. Else, if it is currently not 'liked', POST it to the backend

    if (heart.textContent === likedHeart) {
        // Send a POST request to the server to "like" the post
        const response = await fetch('/api/likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ post_id: post_id, isLiked: true })
        })
        
        if (response.ok) {
          console.log('Liked successfully');
        } else {
          alert(response.statusText);
        }
      } else {
        // Send a DELETE request to the server to "unlike" the post
        const response = await fetch(`/api/likes/${post_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ post_id: post_id })
        })
        
        if (response.ok) {
          console.log('Unliked successfully');
        } else {
          alert(response.statusText);
        }
      }
    });
    
})

