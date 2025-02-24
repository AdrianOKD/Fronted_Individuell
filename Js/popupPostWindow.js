document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    const createPostButton = document.querySelector('.create-post-button');
    const createPostPopup = document.getElementById('createPostPopup');
    const closeButton = document.querySelector('.close-button');
    const createPostForm = document.getElementById('createPostForm');

    closeButton.addEventListener('click', () => {
        createPostPopup.style.display = 'none';
      });
      createPostButton.addEventListener('click', () => {
        createPostButton.style.display = 'block';
      });
      window.addEventListener('click', (event) => {
        if (event.target === popup) {
          createPostButton.style.display = 'none';
        }
      });
    
})

