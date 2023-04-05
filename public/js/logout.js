const logout = async () => {
   
    const response = await fetch('/api/users/logout', {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
    });
  
    if (response.ok) {
      document.location.replace('/landing-page');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);