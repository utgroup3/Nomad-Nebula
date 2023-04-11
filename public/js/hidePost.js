// wait for the DOM to load before executing any code
document.addEventListener('DOMContentLoaded', () => {
  // find all hide links and add click event listeners to each one
  const hideLinks = document.querySelectorAll('.post-wrapper .hide-link');
  const unhideLinks = document.querySelectorAll('.post-actions .unhide-link');

  hideLinks.forEach((hideLink) => {
    hideLink.addEventListener('click', (e) => {
      e.preventDefault();
      // get the post wrapper element and the post container within it
      const postWrapper = e.target.closest('.post-wrapper');
      const postContainer = postWrapper.querySelector('.post-container');
      // get the unhide link in the next sibling element of the post wrapper
      const unhideLink = postWrapper.nextElementSibling.querySelector('.unhide-link');

      // hide the post container and hide link, and show the unhide link
      postContainer.style.display = 'none';
      hideLink.style.display = 'none';
      unhideLink.style.display = 'block';
    });
  });

  // find all unhide links and add click event listeners to each one
  unhideLinks.forEach((unhideLink) => {
    unhideLink.addEventListener('click', (e) => {
      e.preventDefault();
      // get the post wrapper element and the post container within it
      const postWrapper = e.target.closest('.post-actions').previousElementSibling;
      const postContainer = postWrapper.querySelector('.post-container');
      // get the hide link within the post wrapper
      const hideLink = postWrapper.querySelector('.hide-link');

      // show the post container and hide/unhide links
      postContainer.style.display = 'block';
      hideLink.style.display = 'block';
      unhideLink.style.display = 'none';
    });
  });
});