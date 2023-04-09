document.addEventListener('DOMContentLoaded', () => {
  const hideLinks = document.querySelectorAll('.post-wrapper .hide-link');
  const unhideLinks = document.querySelectorAll('.post-actions .unhide-link');

  hideLinks.forEach((hideLink) => {
    hideLink.addEventListener('click', (e) => {
      e.preventDefault();
      const postWrapper = e.target.closest('.post-wrapper');
      const postContainer = postWrapper.querySelector('.post-container');
      const unhideLink = postWrapper.nextElementSibling.querySelector('.unhide-link');

      postContainer.style.display = 'none';
      hideLink.style.display = 'none';
      unhideLink.style.display = 'block';
    });
  });

  unhideLinks.forEach((unhideLink) => {
    unhideLink.addEventListener('click', (e) => {
      e.preventDefault();
      const postWrapper = e.target.closest('.post-actions').previousElementSibling;
      const postContainer = postWrapper.querySelector('.post-container');
      const hideLink = postWrapper.querySelector('.hide-link');

      postContainer.style.display = 'block';
      hideLink.style.display = 'block';
      unhideLink.style.display = 'none';
    });
  });
});