/* apiClient.js */

// export async function fetchPosts(){
//     const response = await fetch('https://dummyjson.com/posts');
//     return await response.json();
// }
export async function fetchPosts() {
    try {
        const response = await fetch('https://dummyjson.com/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
        // Return mock data if API fails
        return {
            posts: [
                {
                    id: 1,
                    title: "Sample Post",
                    body: "This is a sample post body text that will be displayed on the page.",
                    tags: ["sample", "test"],
                    reactions: 5,
                    userId: 1
                }
            ]
        };
    }
}

export async function fetchUsers(){
    const response = await fetch('https://dummyjson.com/users?limit=200');
    return await response.json();
}
export async function fetchComments(){
    const response = await fetch('https://dummyjson.com/comments');
    return await response.json();
}