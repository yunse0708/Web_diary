function handlePostFormSubmit(event) {
  event.preventDefault();

  const author = document.getElementById("author").value.trim();
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  const images = document.getElementById("images").files;

  if (!author) {
    alert("작성자를 입력하세요.");
    document.getElementById("author").focus();
    return;
  }

  if (!title) {
    alert("제목을 입력하세요.");
    document.getElementById("title").focus();
    return;
  }

  if (!content) {
    alert("내용을 입력하세요.");
    document.getElementById("content").focus();
    return;
  }

  if (images.length > 2) {
    document.getElementById("file-count-message").textContent =
      "사진은 최대 2개까지 첨부할 수 있습니다.";
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
    let loadedImages = 0;
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();
      reader.onload = function (event) {
        newPost.images.push(event.target.result);
        loadedImages++;
        if (loadedImages === images.length) {
          savePost(newPost);
        }
      };
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
    if (imageInput.files.length > 2) {
      document.getElementById("file-count-message").textContent =
        "사진은 최대 2개까지 첨부할 수 있습니다.";
    } else {
      document.getElementById("file-count-message").textContent = "";
    }
  });
});
