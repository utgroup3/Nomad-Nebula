const loginFormHandler = async (event) => {
  
  event.preventDefault();

  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (username && password) {
    
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      window.open('/profile', '_self');
    } else {
      alert(response.statusText);
    }
  }
};


document
  .querySelector('.login-form form')
  .addEventListener('submit', loginFormHandler);