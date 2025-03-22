document.addEventListener('DOMContentLoaded', () => {
    loadSelectedPost();
})

function loadSelectedPost() {

    const post = JSON.parse(localStorage.getItem('selectedPost'));
    const user = JSON.parse(localStorage.getItem('selectedUser'));
}