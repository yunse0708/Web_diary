let posts = JSON.parse(localStorage.getItem("posts")) || [];

function displayPosts() {
  const postList = document.getElementById("post-list");
  postList.innerHTML = "";

  // 최신 글이 위로 오도록 정렬
  posts.sort((a, b) => b.id - a.id);

  if (posts.length === 0) {
    const noPostsMessage = document.createElement("p");
    noPostsMessage.textContent = "작성하신 일기가 없습니다.";
    postList.appendChild(noPostsMessage);
  } else {
    posts.forEach((post) => {
      const postElement = createPostElement(post);
      postList.appendChild(postElement);
    });
  }
}

function createPostElement(post) {
  const postElement = document.createElement("article");
  postElement.classList.add("post");
  const shortenedContent =
    post.content.length > 50 ? post.content.slice(0, 50) + "..." : post.content;
  postElement.innerHTML = `
    <h3>${post.title}</h3>
    <p class="date"><strong>날짜:</strong> ${post.date}</p>
    <p>${shortenedContent}</p>
    <div class="button-group">
      <button class="delete-button" data-id="${post.id}">삭제</button>
      <button class="edit-button" data-id="${post.id}">수정</button>
      <button class="view-detail-button" data-id="${post.id}">들어갈래?</button>
    </div>
  `;
  return postElement;
}

function addPost(post) {
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
}

function deletePost(postId) {
  posts = posts.filter((post) => post.id !== postId);
  localStorage.setItem("posts", JSON.stringify(posts));
}

function viewPostDetail(postId) {
  const post = posts.find((p) => p.id === postId);
  if (post) {
    localStorage.setItem("currentPost", JSON.stringify(post));
    window.location.href = "detail.html";
  }
}

function handleButtonClick(event) {
  if (event.target.classList.contains("delete-button")) {
    const postId = parseInt(event.target.dataset.id);
    deletePost(postId);
    displayPosts();
  } else if (event.target.classList.contains("edit-button")) {
    const postId = parseInt(event.target.dataset.id);
    window.location.href = `edit.html?id=${postId}`;
  } else if (event.target.classList.contains("view-detail-button")) {
    const postId = parseInt(event.target.dataset.id);
    viewPostDetail(postId);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayPosts();
});

const writePostButton = document.getElementById("write-post-button");
writePostButton.addEventListener("click", () => {
  window.location.href = "write.html";
});

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
  const searchInput = document
    .getElementById("search-input")
    .value.trim()
    .toLowerCase();
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchInput) ||
      post.author.toLowerCase().includes(searchInput) ||
      post.content.toLowerCase().includes(searchInput)
  );

  displayFilteredPosts(filteredPosts);
});

document.addEventListener("click", handleButtonClick);

function displayFilteredPosts(filteredPosts) {
  const postList = document.getElementById("post-list");
  postList.innerHTML = "";

  if (filteredPosts.length === 0) {
    const noPostsMessage = document.createElement("p");
    noPostsMessage.textContent = "검색 결과가 없습니다.";
    postList.appendChild(noPostsMessage);
  } else {
    filteredPosts.forEach((post) => {
      const postElement = createPostElement(post);
      postList.appendChild(postElement);
    });
  }
}
