/* popupPostWindow.js */
import { Post } from "./post.js";
import { createPostElement, truncateText, usersArray } from "./main.js";

export function setupPopup() {
  const createPostButton = document.querySelector(".create-post-button");
  const createPostPopup = document.getElementById("createPostPopup");
  const closeButton = document.querySelector(".close-button");
  const createPostForm = document.getElementById("createPostForm");

  function addUsersDropDown() {
    addUsersDropDown.innerHTML = "";

    for (user in usersArray)
    {
      const user = usersArray[userId];
      const userDropDown = document.createElement("a")
      userDropDown.href = "#";
      userDropDown.textContent = "${user.firstName}, ${user.lastName} ";
      userDropDown.dataset.userId = user.Id; 
    }
  }

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

    const createPost = new Post(
      Date.now(),
      formData.title,
      formData.body,
      formData.tags,
      0,
      0,
      1,

    );

    createPostContainer(createPost);


    createPostForm.reset();
    createPostPopup.style.display = "none";
  });
}
function createPostContainer (Post){
      const postsContainer = document.getElementById("posts-list-container"); 

      const defaultUser = {
        firstName: "Fake",
        lastName: "User"
      };   
  
      const postElement = createPostElement(Post, defaultUser);
  
      if (postsContainer.firstChild) {
        postsContainer.insertBefore(postElement, postsContainer.firstChild);
      } else {
        postsContainer.appendChild(postElement);
      }
    }


    
   