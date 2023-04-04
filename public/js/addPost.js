async function newFormHandler(event) {
  console.log('Form submitted');
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;
  const body = document.querySelector('textarea[name="post-body"]').value;

  console.log(title);
  console.log(body);

  try {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_content: body,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      console.log('Post created successfully!');

      // Redirect to dashboard
      document.location.replace('/dashboard');
    } else {
      console.log('Failed to create post');
      alert(response.statusText);
    }
  } catch (err) {
    console.log(err);
    alert('Failed to create post');
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);