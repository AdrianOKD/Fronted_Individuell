/* main.js */
import { fetchPosts, fetchUsers } from "./apiClient.js";
import { setupPopup } from "./popupPostWindow.js";
import { Post } from "./post.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");

  if (document.querySelector(".create-post-button")) {
    setupPopup();
  }
  fetchUsers().then((userData) => {
    userData.users.forEach((user) => {
      usersArray[user.id] = user;
    });
  });
  if (!document.getElementById("selected-post-container")) {
    main();
  }

  main();
});
export let usersArray = {};
function main() {
  if (document.getElementById("selected-post-container")) {
    return;
  }

  fetchPosts().then((postsData) => {
    console.log("Posts data received:", postsData);
    const postsContainer = document.getElementById("posts-list-container");
    if (!postsContainer) {
      console.error("Posts container not found!");
      return;
    }
    postsContainer.innerHTML = "";

    postsData.posts.forEach((post) => {
      const user = usersArray[post.userId];
      const postElement = createPostElement(post, user);
      postsContainer.appendChild(postElement);
    });
  });
}
export function createPostElement(post, user) {
  const postBox = document.createElement("div");
  postBox.classList.add("box");
  postBox.dataset.postId = post.id;
  postBox.style.cursor = "pointer";

  if (!post.reactions || typeof post.reactions !== "object") {
    post.reactions = { likes: 0, dislikes: 0 };
  } else if (!("likes" in post.reactions) || !("dislikes" in post.reactions)) {
    const totalReactions =
      typeof post.reactions === "number" ? post.reactions : 0;
    post.reactions = { likes: totalReactions, dislikes: 0 };
  }

  const reactionsContainer = document.createElement("div");
  reactionsContainer.classList.add("reactions-container");

  const likeButton = document.createElement("button");
  likeButton.classList.add("reaction-button", "like-button");
  likeButton.innerHTML =
    "👍 <span class='like-count'>" + post.reactions.likes + "</span>";

  const dislikeButton = document.createElement("button");
  dislikeButton.classList.add("reaction-button", "dislike-button");
  dislikeButton.innerHTML =
    "👎 <span class='dislike-count'> " + post.reactions.dislikes + "</span>";

  likeButton.addEventListener("click", function (e) {
    e.stopPropagation();
    post.reactions.likes++;
    updatePostReactionsInLocalStorage(post);
    this.querySelector(".like-count").textContent = post.reactions.likes;
  });

  dislikeButton.addEventListener("click", function (e) {
    e.stopPropagation();
    post.reactions.dislikes++;
    updatePostReactionsInLocalStorage(post);
    this.querySelector(".dislike-count").textContent = post.reactions.dislikes;
  });

  reactionsContainer.appendChild(likeButton);
  reactionsContainer.appendChild(dislikeButton);

  const title = document.createElement("header");
  title.classList.add("post-title");
  title.innerText = post.title;

  const body = document.createElement("section");
  body.classList.add("post-body");
  body.innerText = truncateText(post.body, 60);

  const tags = document.createElement("p");
  tags.classList.add("post-tags");
  tags.innerText = `Tags: ${post.tags.join(", ")}`;

  const userElement = document.createElement("div");
  userElement.classList.add("post-user");
  userElement.innerText = user
    ? `User: ${user.firstName} ${user.lastName}`
    : "Unknown User";

  postBox.appendChild(title);
  postBox.appendChild(body);
  postBox.appendChild(tags);
  postBox.appendChild(userElement);
  postBox.appendChild(reactionsContainer);

  
  postBox.addEventListener("click", () => {
    openSelectedPost(post, user);
  });

  return postBox;
}

function updatePostReactionsInLocalStorage(post) {
    const storedPost = JSON.parse(localStorage.getItem("selectedPost"));
    if (storedPost && storedPost.id === post.id) {
      storedPost.reactions = post.reactions;
      localStorage.setItem("selectedPost", JSON.stringify(storedPost));
    }
}

export function truncateText(text, wordLimit = 60) {
  let words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
}

function openSelectedPost(post, user) {
  localStorage.setItem("selectedPost", JSON.stringify(post));
  localStorage.setItem("selectedUser", JSON.stringify(user));
  window.location.href = "Posts.html";
}
