const idleTimeout = 1800000;
let idleTimer;

function resetIdleTimer() {
  clearTimeout(idleTimer);

  // Start the idle timer
  idleTimer = setTimeout(() => {

    // Show the login modal
    if (window.location.pathname != '/login' && window.location.pathname != '/signup') {
      const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
      loginModal.show();
    }
  }, idleTimeout);
}

// Reset the idle timer on any user activity
window.addEventListener("mousemove", resetIdleTimer);
window.addEventListener("mousedown", resetIdleTimer);
window.addEventListener("keypress", resetIdleTimer);
window.addEventListener("touchmove", resetIdleTimer);
window.addEventListener("onscroll", resetIdleTimer);
window.addEventListener("click", resetIdleTimer)

// Start the idle timer initially
resetIdleTimer();