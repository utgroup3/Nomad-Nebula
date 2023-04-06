async function newFormHandler(event) {
  console.log('Form submitted');
  event.preventDefault();

  const title = document.querySelector('input[name="title"]').value;
  const body = document.querySelector('textarea[name="text"]').value;

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


// CASSIE - DIDN'T WANT TO OVERRIDE CODE ABOVE - BUT THIS IS THE CODE I WAS TRYING TO USE
// async function newFormHandler(event) {
  // console.log('Form submitted');
  // event.preventDefault();

  // const form = event.target;
  // const formData = new FormData(form);

  // try {
  //   const response = await fetch('/api/posts', {
  //     method: 'POST',
  //     body: formData,
  //   });

  //   if (response.ok) {
  //     console.log('Post created successfully!');

      // Redirect to dashboard
//       document.location.replace('/dashboard');
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