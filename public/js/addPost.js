const form = document.querySelector('.new-post-form');

if (form) {
  form.onsubmit = function(event) {
    event.preventDefault();

    let data = new FormData(form);

    axios({
      method: 'post',
      url: 'api/posts',
      data: data,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {

        if (response.status === 200) {
          window.open('/profile', '_self');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
}

// async function newFormHandler(event) {
//   console.log('Form submitted');
//   event.preventDefault();

//   const title = document.querySelector('input[name="title"]').value;
//   const body = document.querySelector('textarea[name="content"]').value;

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