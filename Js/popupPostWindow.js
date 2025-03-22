/* popupPostWindow.js */
import { Post } from "./post.js";
import { createPostElement, truncateText, usersArray } from "./main.js";

export function setupPopup() {
  const createPostButton = document.querySelector(".create-post-button");
  const createPostPopup = document.getElementById("createPostPopup");
  const closeButton = document.querySelector(".close-button");
  const createPostForm = document.getElementById("createPostForm");
  let selectedUser = 1;

  function addUsersDropDown() {
    const dropdownContent= document.querySelector(".dropdown-content");
    dropdownContent.innerHTML = "";

    document.querySelector(".dropbtn").textContent = "Select user"

    for (const userId in usersArray)
    {
      const user = usersArray[userId];
      const userDropDown = document.createElement("a")
      userDropDown.href = "#";
      userDropDown.textContent = `${user.firstName}, ${user.lastName} `;
      userDropDown.dataset.userId = user.id; 
      userDropDown.addEventListener("click", () => {
        selectedUser = user.id;
        document.querySelector(".dropbtn").textContent = `${user.firstName} ${user.lastName}`;
      });
      dropdownContent.appendChild(userDropDown);
    }
  }

  closeButton.addEventListener("click", () => {
    createPostPopup.style.display = "none";
  });

  createPostButton.addEventListener("click", () => {
    createPostPopup.style.display = "block";
    addUsersDropDown();
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
      selectedUser,

    );

    createPostContainer(createPost);


    createPostForm.reset();
    createPostPopup.style.display = "none";
  });
}
function createPostContainer (Post){
      const postsContainer = document.getElementById("posts-list-container"); 

      const user = usersArray[Post.userId] || {
        firstName: "Fake",
        lastName: "User"
      };   
  
      const postElement = createPostElement(Post, user);
  
      if (postsContainer.firstChild) {
        postsContainer.insertBefore(postElement, postsContainer.firstChild);
      } else {
        postsContainer.appendChild(postElement);
      }
    }


    
   