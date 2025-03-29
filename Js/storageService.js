export const STORAGE_KEYS = {
  POSTS: "app_posts",
  USER_POSTS: "user_posts",
  USER_COMMENTS: "userComments",
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
  storeData(key, items);
  return items;
}
