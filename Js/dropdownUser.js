import { usersArray } from "./main.js";

export function setupUserDropdown(container, onUserSelected) {
  let dropdownContainer = container.querySelector(".dropdownuser");
  
  if (!dropdownContainer) {
    dropdownContainer = document.createElement("div");
    dropdownContainer.className = "dropdownuser";
    
    const dropdownButton = document.createElement("button");
    dropdownButton.className = "dropbtn";
    dropdownButton.textContent = "Select user";
    
    const dropdownContent = document.createElement("div");
    dropdownContent.className = "dropdown-content";
    
    dropdownContainer.appendChild(dropdownButton);
    dropdownContainer.appendChild(dropdownContent);
    
    const submitButton = container.querySelector("button[type='submit']");
    if (submitButton) {
      submitButton.parentNode.insertBefore(dropdownContainer, submitButton);
    } else {
      container.appendChild(dropdownContainer);
    }
  }
  
  const dropdownContent = dropdownContainer.querySelector(".dropdown-content");
  const dropdownButton = dropdownContainer.querySelector(".dropbtn");
  dropdownContent.innerHTML = "";
  dropdownButton.textContent = "Select user";
  
  for (const userId in usersArray) {
    const user = usersArray[userId];
    const userDropDown = document.createElement("a");
    userDropDown.href = "#";
    userDropDown.textContent = `${user.firstName} ${user.lastName}`;
    userDropDown.dataset.userId = user.id;
    
    userDropDown.addEventListener("click", () => {
      const selectedUser = user.id;
      dropdownButton.textContent = `${user.firstName} ${user.lastName}`;
      
      if (typeof onUserSelected === 'function') {
        onUserSelected(selectedUser);
      }
    });
    
    dropdownContent.appendChild(userDropDown);
  }
  
  return dropdownContainer;
}

