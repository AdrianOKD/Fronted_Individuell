export const STORAGE_KEYS = {
  POSTS: "app_posts",
  COMMENTS: "app_comments",
  USERS: "app_users",
  USER_POSTS: "stored_posts",
  USER_COMMENTS: "stored_comments",
};

export function getStoredLocalData(key) {
  const data = localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data);
}

export function storeLocalData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function addUserItem(key, item) {
  const items = getStoredLocalData(key) || [];
  items.push(item);
  storeLocalData(key, items);
  return items;
}
