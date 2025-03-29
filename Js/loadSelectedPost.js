import { fetchComments, fetchUsers } from "/Js/apiClient.js";
import { createPostElement } from "/Js/main.js";
import { Comment } from "/Js/comment.js";
import { setupCommentPopup } from "/Js/popupCommentWindow.js";

let usersArray = {};
document.addEventListener("DOMContentLoaded", () => {
  fetchUsers().then((userData) => {
    userData.users.forEach((user) => {
      usersArray[user.id] = user;
    });
    loadSelectedPost();
    loadSelectedPostComments();
    setupCommentPopup();
  });
});


function loadSelectedPost() {
  const post = JSON.parse(localStorage.getItem("selectedPost"));
  const user = JSON.parse(localStorage.getItem("selectedUser"));

  const container = document.getElementById("selected-post-container");
  const selectedPost = createPostElement(post, user);

  const selectedPostBody = selectedPost.querySelector(".post-body");
  selectedPostBody.innerText = post.body;
  container.appendChild(selectedPost);
}

function loadSelectedPostComments() {
  const post = JSON.parse(localStorage.getItem("selectedPost"));

  const commentSection = document.createElement("div");
  commentSection.id = "comment-section";

  const commentsList = document.createElement("div");
  commentsList.id = "commentsList";
  commentSection.appendChild(commentsList);

  const container = document.getElementById("selected-post-container");
  container.appendChild(commentSection);

  fetchComments().then((response) => {
    const postId = Number(post.id);
    const selectedPostComments = response.comments.filter(
      (comment) => comment.postId === postId
    );
    console.log("Filtered comments for post:", selectedPostComments);
    console.log("Current post ID:", post.id);
    selectedPostComments.forEach((comment) => {
      addCommentToPost(comment, commentsList);
    });
  });
}

function addCommentToPost(comment, commentList) {
  const comments = document.createElement("div");
  comments.className = "comments";

  const user = document.createElement("div");
  user.className = "comment-user";
  user.textContent = `${comment.user.fullName} (${comment.user.username})`;

  const commentBody = document.createElement("div");
  commentBody.className = "comment-body";
  commentBody.textContent = comment.body;

  comments.appendChild(user);
  comments.appendChild(commentBody);
  commentList.appendChild(comments);
}
