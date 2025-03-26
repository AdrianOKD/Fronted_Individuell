import { usersArray } from "./main.js";

export function addUsersDropDown(container, onUserSelected) {
  const dropdownContent = container.querySelector(".dropdown-content");
  const dropdownButton = container.querySelector(".dropbtn");
  
  if (dropdownContent) {
    dropdownContent.innerHTML = "";
  }
  
  if (dropdownButton) {
    dropdownButton.textContent = "Select user";
  }
  
  for (const userId in usersArray) {
    const user = usersArray[userId];
    const userDropDown = document.createElement("a");
    userDropDown.href = "#";
    userDropDown.textContent = `${user.firstName} ${user.lastName}`;
    userDropDown.dataset.userId = user.id;
    
    userDropDown.addEventListener("click", () => {
      const selectedUser = user.id;
      
      if (dropdownButton) {
        dropdownButton.textContent = `${user.firstName} ${user.lastName}`;
      }
      
      if (typeof onUserSelected === 'function') {
        onUserSelected(selectedUser);
      }
    });
    
    dropdownContent.appendChild(userDropDown);
  }
}