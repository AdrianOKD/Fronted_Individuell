/* index.js */
fetch('https://dummyjson.com/users')
.then(res => res.json())
.then(console.log);

function openNav() {
    document.getElementById("Sidenav").style.width = "250px";
  }

  function closeNav() {
    document.getElementById("Sidenav").style.width = "0";
  }