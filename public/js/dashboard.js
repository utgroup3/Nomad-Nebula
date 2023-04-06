async function getPosts() {
    try {
      const response = await fetch('/api/posts');
  
      if (response.ok) {
        const posts = await response.json();
        console.log(posts);
      } else {
        console.log('Failed to fetch posts');
        alert(response.statusText);
      }
    } catch (err) {
      console.log(err);
      alert('Failed to fetch posts');
    }
  }
  
  getPosts();