import {fetchPosts} from "./apiClient.js"

function main() {
    fetchPosts().then(res => {
        posts = res.posts;
        console.log(res)
    })
}