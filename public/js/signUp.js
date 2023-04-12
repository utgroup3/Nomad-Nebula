const signupFormHandler = async (event) => {
    event.preventDefault(); 
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const location = document.querySelector('#location-signup').value.trim();
    const birthday = document.querySelector('#birthday-signup').value;
    
    if (username && password && location && birthday) {
      
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password, location, birthday }), 
        headers: { 'Content-Type': 'application/json' }, 
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert(response.statusText);
      }
    }
  };
  

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);