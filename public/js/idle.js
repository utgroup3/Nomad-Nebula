const idleTimeout = 30 * 60 * 1000;
let idleTimer;

function resetIdleTimer() {
  clearTimeout(idleTimer);

  // Start the idle timer
  idleTimer = setTimeout(() => {
    // Show the login modal
    if (window.location.pathname != '/login' && window.location.pathname != '/signup') {
      const loginModal = document.getElementById("loginModal");
      loginModal.classList.add('is-active');
    }
  }, idleTimeout);
}

// Reset the idle timer on any user activity
window.addEventListener("mousemove", resetIdleTimer);
window.addEventListener("mousedown", resetIdleTimer);
window.addEventListener("keypress", resetIdleTimer);
window.addEventListener("touchmove", resetIdleTimer);
window.addEventListener("onscroll", resetIdleTimer);
window.addEventListener("click", resetIdleTimer);

// Start the idle timer initially
resetIdleTimer();

// Add an event listener to close the modal and redirect to the login page
const closeModalButton = document.querySelector('#loginModal .delete');
closeModalButton.addEventListener('click', () => {
  const loginModal = document.querySelector('#loginModal');
  loginModal.classList.remove('is-active');
  window.location.href = '/login';
});