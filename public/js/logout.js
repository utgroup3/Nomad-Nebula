// Define an asynchronous function to handle user logout
const logout = async () => {
    // Send a POST request to the server to log the user out
    const response = await fetch('/api/users/logout', {
      method: 'POST', // Use the POST method to send data
      headers: { 'Content-Type': 'application/json' }, // Set the request header to JSON format
    });
  
    // If the response status is OK (200), redirect the user to the homepage
    if (response.ok) {
      document.location.replace('/');
    } else {
      // If there's an error, show an alert with the response status text
      alert(response.statusText);
    }
  };
  
  // Add an event listener to the logout button to call the logout function
  document.querySelector('#logout').addEventListener('click', logout);