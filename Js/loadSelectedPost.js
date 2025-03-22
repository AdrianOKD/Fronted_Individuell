import { createPostElement } from "./main.js";

document.addEventListener('DOMContentLoaded', () => {
    loadSelectedPost();
})

function loadSelectedPost() {

    const post = JSON.parse(localStorage.getItem('selectedPost'));
    const user = JSON.parse(localStorage.getItem('selectedUser'));


    const container = document.getElementById('selected-post-container')
    const selectedPost = createPostElement(post,user);

    const selectedPostBody = selectedPost.querySelector('.post-body');
    selectedPostBody.innerText = post.body;

    container.appendChild(selectedPost);
}