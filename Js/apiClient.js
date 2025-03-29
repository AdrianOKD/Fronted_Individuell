import {
  getStoredLocalData,
  STORAGE_KEYS,
  storeLocalData,
} from "./storageService.js";

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
    const postsData = await response.json();

    storeLocalData(STORAGE_KEYS.POSTS, postsData);

    return postsData;
  } catch (error) {
    console.error("Something went wrong while fetching posts:", error);
    return { posts: [] };
  }
}

export async function fetchUsers() {
  try {
    const storedLocalUsers = getStoredLocalData(STORAGE_KEYS.USERS);
    if (storedLocalUsers) {
      console.log("Found and using users from localStorage");
      return storedLocalUsers;
    }
    console.log("Could not find users in localStorage, fetching from API");
    const response = await fetch("https://dummyjson.com/users?limit=200");
    const userData = await response.json();

    storeLocalData(STORAGE_KEYS.USERS, userData);
    return userData;
  } catch (error) {
    console.error("Something went wrong while fetching users:", error);
    return { users: [] };
  }
}

export async function fetchComments() {
  try {
    const storedLocalComments = getStoredLocalData(STORAGE_KEYS.COMMENTS);
    if (storedLocalComments) {
      console.log("Using comments stored in localStorage");
      return storedLocalComments;
    }
    console.log("No comments found in localStorage, fetching from API");
    const response = await fetch("https://dummyjson.com/comments");
    const commentsData = await response.json();
    storeLocalData(STORAGE_KEYS.COMMENTS, commentsData);
    return commentsData;
  } catch (error) {
    console.error("Something went wrong while fetching comments:", error);
    return { comments: [] };
  }
}
