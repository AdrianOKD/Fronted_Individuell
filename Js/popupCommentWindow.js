import { Comment } from "./comment.js";
import { usersArray } from "./main.js";
import { addUsersDropDown } from "./dropdownUser.js";


export function setupCommentPopup() {
  const createCommentButton = document.querySelector(".create-comment-button");
  const commentPopup = document.getElementById("createCommentPopup");
  const closeButton = commentPopup.querySelector(".close-button");
  const createCommentForm = document.getElementById("createCommentForm");
  
  const post = JSON.parse(localStorage.getItem("selectedPost"));
  const postId = post ? post.id : null;

  let selectedUser = 1;
  
  function handleUserSelection(userId) {
    selectedUser = userId;
  }
  
  
  closeButton.addEventListener("click", () => {
    commentPopup.style.display = "none";
  });
  
  createCommentButton.addEventListener("click", () => {
    commentPopup.style.display = "block";
    addUsersDropDown(createCommentForm, handleUserSelection);
  });
  
  window.addEventListener("click", (event) => {
    if (event.target === commentPopup) {
      commentPopup.style.display = "none";
    }
  });
  
  createCommentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const commentText = document.getElementById("commentBody").value;
    
    const user = usersArray[selectedUser];
    
    const createComment = new Comment(
      Date.now(),            
      commentText,            
      postId,                 
      0,                      
      user             
    );

    
    addCommentToPost(createComment);
    
    const storedComments = JSON.parse(localStorage.getItem("stored_comments")) || [];
    storedComments.push(createComment);
    localStorage.setItem("stored_comments", JSON.stringify(storedComments));
    
    createCommentForm.reset();
    commentPopup.style.display = "none";
  });
}

function addCommentToPost(comment) {
  const commentsList = document.getElementById("commentsList");
  
  const noComments = commentsList.querySelector(".no-comments");
  if (noComments) {
    noComments.remove();
  }
  
  const popupCommentElement = document.createElement("div");
  popupCommentElement.className = "popup-comment";
  popupCommentElement.dataset.commentId = comment.id;
  
  const user = document.createElement("div");
  user.className = "comment-user";
  
  const userName = `${comment.user.firstName} ${comment.user.lastName}`;
  const userHandle = comment.user.username || `user${comment.user.id}`;
  
  user.textContent = `${userName} (${userHandle})`;
  
  const commentBody = document.createElement("div");
  commentBody.className = "comment-body";
  commentBody.textContent = comment.body;
  
  const likes = document.createElement("div");
  likes.className = "comment-likes";
  likes.textContent = `${comment.likes} ${comment.likes === 1 ? 'like' : 'likes'}`;
  
  popupCommentElement.appendChild(user);
  popupCommentElement.appendChild(commentBody);
  popupCommentElement.appendChild(likes);
  
  if (commentsList.firstChild) {
    commentsList.insertBefore(popupCommentElement, commentsList.firstChild);
  } else {
    commentsList.appendChild(popupCommentElement);
  }
}