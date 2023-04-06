document.querySelectorAll('.explanation-header').forEach(header => {
    header.addEventListener('click', () => {
      const explanation = header.closest('.explanation');
      explanation.classList.toggle('expanded');

      const arrowIcon = header.querySelector('.arrow-icon');
      arrowIcon.classList.toggle('open');
    });
  });