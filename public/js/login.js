// Define an async function to handle form submission
const loginFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Extract the username and password values from the form fields and trim whitespace
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    // Check if both fields are not empty
    if (username && password) {
      // Send an HTTP POST request to the '/api/users/login' endpoint with the username and password values in the request body
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      // If the response from the server is successful, redirect the page to the dashboard
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        // If the response is not successful, display an alert with the status text from the server response
        alert(response.statusText);
      }
    }
  };
  
  // Attach the loginFormHandler function to the form submit event of the login form
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);