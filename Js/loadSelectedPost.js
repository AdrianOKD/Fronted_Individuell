import { fetchComments } from "./apiClient";
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
function loadSelectedPostComments()
{
    const post = JSON.parse(localStorage.getItem('selectedPost'))


   const commentSection = document.createElement('div');
   commentSection.id = 'comment-section'

   const commentsList  = document.createElement('div')
   commentList.id = 'commentList';
   commentSection.appendChild(commentsList);


}

document.getElementById('select-post-container').appendChild(commentSection);

fetchComments().then(response => {
    const selectedPostComments = response.comments.filter(comment => comment.postId === post.id);
}) 