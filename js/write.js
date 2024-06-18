function handlePostFormSubmit(event) {
  event.preventDefault();

  const author = document.getElementById("author").value;
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const images = document.getElementById("images").files;

  if (images.length > 2) {
    document.getElementById("file-count-message").textContent =
      "사진은 최대 1개까지 첨부할 수 있습니다.";
    return;
  }

  const newPost = {
    id: Date.now(),
    author: author,
    title: title,
    content: content,
    date: new Date().toISOString().split("T")[0],
    images: [],
  };

  if (images.length > 0) {
    const reader = new FileReader();
    reader.onload = function (event) {
      newPost.images.push(event.target.result);
      if (newPost.images.length === images.length) {
        savePost(newPost);
      }
    };
    for (let i = 0; i < images.length; i++) {
      reader.readAsDataURL(images[i]);
    }
  } else {
    savePost(newPost);
  }
}

function savePost(post) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const postForm = document.getElementById("post-form");
  postForm.addEventListener("submit", handlePostFormSubmit);

  const imageInput = document.getElementById("images");
  imageInput.addEventListener("change", () => {
    if (imageInput.files.length > 1) {
      document.getElementById("file-count-message").textContent =
        "사진은 최대 2개까지 첨부할 수 있습니다.";
    } else {
      document.getElementById("file-count-message").textContent = "";
    }
  });
});
