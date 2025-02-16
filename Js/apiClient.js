

export async function fetchPosts(){
    const response = await fetch('https://dummyjson.com/posts');
    return await response;

}
