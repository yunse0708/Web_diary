document.addEventListener("DOMContentLoaded", () => {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  const urlParams = new URLSearchParams(window.location.search);
  const postId = parseInt(urlParams.get("id"));

  const postToEdit = posts.find((post) => post.id === postId);
  if (postToEdit) {
    document.getElementById("edit-author").value = postToEdit.author;
    document.getElementById("edit-title").value = postToEdit.title;
    document.getElementById("edit-content").value = postToEdit.content;
  }

  const editPostForm = document.getElementById("edit-post-form");
  editPostForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const editedAuthor = document.getElementById("edit-author").value;
    const editedTitle = document.getElementById("edit-title").value;
    const editedContent = document.getElementById("edit-content").value;

    const updatedPost = {
      id: postId,
      author: editedAuthor,
      title: editedTitle,
      content: editedContent,
      date: postToEdit.date, 
    };

    editPost(postId, updatedPost);
    window.location.href = "index.html"; 
  });
});

function editPost(postId, updatedPost) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const postIndex = posts.findIndex((post) => post.id === postId);
  if (postIndex !== -1) {
    posts[postIndex] = updatedPost;
    localStorage.setItem("posts", JSON.stringify(posts));
  }
}
