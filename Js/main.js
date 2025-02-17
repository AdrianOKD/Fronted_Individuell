import {fetchPosts} from "./apiClient.js";
import {User} from "./user.js";

function main() {
    fetchPosts().then(response => {
        const postsContainer = document.getElementById("posts-list-container");

        response.posts.forEach(post => {
            const postElement = createPostElement(post);
            postsContainer.appendChild(postElement);
        });
    });
}
function createPostElement(post,) {
    const postBox = document.createElement("div");
    postBox.classList.add("box");

    const title = document.createElement("header");
    title.classList.add("post-title");
    title.innerText = post.title;

    const body = document.createElement("section");
    body.classList.add("post-body");
    body.innerText = truncateText(post.body, 60);

    const tags = document.createElement("p");
    tags.classList.add("post-tags");
    tags.innerText = `Tags: ${post.tags.join(", ")}`;

    const user = document.createElement("div");
    user.classList.add("post-user");
    user.innerText = `User Name: ${User.user}`;

    postBox.appendChild(title);
    postBox.appendChild(body);
    postBox.appendChild(tags);
    postBox.appendChild(user);

    return postBox;
}
function truncateText(text, wordLimit = 60) {
    let words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
}
main();