document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".share-facebook").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const postId = event.currentTarget.getAttribute("data-post-id");
      const postUrl = encodeURIComponent(`${window.location.origin}/community/post/${postId}`);
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`;
      window.open(facebookUrl, "_blank");
    });
  });
  
  document.querySelectorAll(".share-whatsapp").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const postUrl = encodeURIComponent(window.location.href + event.currentTarget.getAttribute("data-post-url"));
      const whatsappUrl = `https://api.whatsapp.com/send?text=${postUrl}`;
      window.open(whatsappUrl, "_blank");
    });
  });
  
  document.querySelectorAll(".share-twitter").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const postUrl = encodeURIComponent(window.location.href + event.currentTarget.getAttribute("data-post-url"));
      const postTitle = encodeURIComponent(event.currentTarget.getAttribute("data-post-title"));
      const twitterUrl = `https://twitter.com/intent/tweet?text=${postTitle}&url=${postUrl}`;
      window.open(twitterUrl, "_blank");
    });
  });
});
