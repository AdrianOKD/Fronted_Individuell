import { getStoredLocalData, STORAGE_KEYS, storeLocalData } from "./storageService";

export async function fetchPosts() {
  try {
    const storedlocalPost = getStoredLocalData(STORAGE_KEYS.POSTS);
    if (storedlocalPost) {
      console.log("Using posts stored in localStorage");
      return storedlocalPost;
    }

    console.log("No posts in localStorage, fetching from API");
    const response = await fetch("https://dummyjson.com/posts");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
  const postsData = await resonse.json();

  storeLocalData(STORAGE_KEYS.POSTS, postsData);

  return postsData;
}

export async function fetchUsers() {
  const response = await fetch("https://dummyjson.com/users?limit=200");
  return await response.json();
}
export async function fetchComments() {
  const response = await fetch("https://dummyjson.com/comments");
  return await response.json();
}
