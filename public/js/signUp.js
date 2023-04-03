// Define an asynchronous function to handle the form submission
const signupFormHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Get the username and password from the form input fields
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    // If the username and password are not empty
    if (username && password) {
      // Send a POST request to create a new user with the given username and password
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password }), // Convert the data to JSON format
        headers: { 'Content-Type': 'application/json' }, // Set the request header to JSON format
      });
  
      // If the response status is OK (200)
      if (response.ok) {
        // Redirect to the dashboard page
        document.location.replace('/dashboard');
      } else {
        // Show an error message with the response status text
        alert(response.statusText);
      }
    }
  };
  
  // Add an event listener to the form submit button to call the signupFormHandler function
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);