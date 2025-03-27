/* main.js */
import {fetchPosts, fetchUsers} from "./apiClient.js";
import { setupPopup } from "./popupPostWindow.js";
import { Post } from "./post.js";

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    if(document.querySelector(".create-post-button")){
        setupPopup();
    }
    fetchUsers()
    .then(userData => {
        userData.users.forEach(user => {
            usersArray[user.id] = user;
            
        });
        loadSelectedPost();
    loadSelectedPostComments();
    setupCommentPopup();
  });
    });
    if (!document.getElementById('selected-post-container'))
    {
        main();
    }
    
    main();
  export let usersArray = {};
function main() {
    if (document.getElementById('selected-post-container')) {
        return; 
    }

   fetchPosts()
    .then(postsData => {
        console.log("Posts data received:", postsData);
        const  postsContainer = document.getElementById("posts-list-container");
        if (!postsContainer) {
            console.error("Posts container not found!");
            return;
        }
        postsContainer.innerHTML = "";

        postsData.posts.forEach(post => {
            const user = usersArray[post.userId];
            const postElement = createPostElement(post, user);
            postsContainer.appendChild(postElement);
        });
    })
}
export function createPostElement(post, user) {
    const postBox = document.createElement("div");
    postBox.classList.add("box");
    postBox.dataset.postId = post.id;
    postBox.style.cursor = "pointer";

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
    userElement.innerText = user ? `User: ${user.firstName} ${user.lastName}` : "Unknown User";

    postBox.appendChild(title);
    postBox.appendChild(body);
    postBox.appendChild(tags);
    postBox.appendChild(userElement);

    postBox.addEventListener("click", () => {
        openSelectedPost(post, user);
    });

    return postBox;
}
export function truncateText(text, wordLimit = 60) {
    let words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
}

function openSelectedPost(post, user){
    localStorage.setItem('selectedPost', JSON.stringify(post));
    localStorage.setItem('selectedUser', JSON.stringify(user));
    window.location.href='Posts.html';
}