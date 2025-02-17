

export async function fetchPosts(){
    const response = await fetch('https://dummyjson.com/posts');
    return await response.json();
}
export async function fetchUsers(){
    const response = await fetch('https://dummyjson.com/users');
    return await response.json();
}
export async function fetchComments(){
    const response = await fetch('https://dummyjson.com/comments');
    return await response.json();
}