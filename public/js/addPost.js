async function newFormHandler(event) {
  console.log('Form submitted');
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value;
  const body = document.querySelector('textarea[name="text"]').value;
  const imageInput = document.querySelector('input[name="image"]');

  // Create a FormData object to handle the image upload
  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', body);

  if (imageInput.files[0]) {
    formData.append('image', imageInput.files[0]);
  }

  try {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: formData, // Use formData object as the body
    });

    if (response.ok) {
      console.log('Post created successfully!');

      // Redirect to dashboard
      document.location.replace('/profile');
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

// async function newFormHandler(event) {
//   event.preventDefault();

//   const title = document.querySelector('input[name="title"]').value;
//   const body = document.querySelector('textarea[name="text"]').value;

//   try {
//     const response = await fetch(`/api/posts`, {
//       method: 'POST',
//       body: JSON.stringify({
//         title,
//         content: body,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       console.log('Post created successfully!');

//       // Redirect to dashboard
//       document.location.replace('/profile');
//     } else {
//       console.log('Failed to create post');
//       alert(response.statusText);
//     }
//   } catch (err) {
//     console.log(err);
//     alert('Failed to create post');
//   }
// }

// document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);

