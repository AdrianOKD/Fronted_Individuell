/* popupPostWindow.js */

export function setupPopup() {
  const createPostButton = document.querySelector(".create-post-button");
  const createPostPopup = document.getElementById("createPostPopup");
  const closeButton = document.querySelector(".close-button");
  const createPostForm = document.getElementById("createPostForm");

  closeButton.addEventListener("click", () => {
    createPostPopup.style.display = "none";
  });

  createPostButton.addEventListener("click", () => {
    createPostPopup.style.display = "block";
  });

  window.addEventListener("click", (event) => {
    if (event.target === createPostPopup) {
      createPostPopup.style.display = "none";
    }
  });

  createPostForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = {
      title: document.getElementById("postTitle").value,
      body: document.getElementById("postBody").value,
      tags: document
        .getElementById("postTags")
        .value.split(",")
        .map((tag) => tag.trim()),
    };

    console.log("New post data:", formData);

    createPostForm.reset();
    createPostPopup.style.display = "none";
  });
}
