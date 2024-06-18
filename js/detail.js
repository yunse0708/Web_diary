document.addEventListener("DOMContentLoaded", () => {
  displayPostDetail();
});

function displayPostDetail() {
  const currentPost = JSON.parse(localStorage.getItem("currentPost"));
  const postDetail = document.getElementById("post-detail");

  if (currentPost) {
    postDetail.innerHTML = "";
    const postElement = document.createElement("article");
    postElement.classList.add("post-detail");
    postElement.innerHTML = `
      <h2>${currentPost.title}</h2>
      <p class="author-date"><strong>작성자:</strong> ${currentPost.author} | ${currentPost.date}</p>
      <p>${currentPost.content}</p>
    `;
    if (currentPost.images && currentPost.images.length > 0) {
      currentPost.images.forEach((image) => {
        const imgElement = document.createElement("img");
        imgElement.src = image;
        postElement.appendChild(imgElement);
      });
    }

    postDetail.appendChild(postElement);

    const backButton = document.createElement("button");
    backButton.textContent = "돌아가기";
    backButton.addEventListener("click", () => {
      window.location.href = "../html/index.html";
    });
    postDetail.appendChild(backButton);
  } else {
    postDetail.innerHTML = ""; // 기존 내용 초기화
    const noPostMessage = document.createElement("p");
    noPostMessage.textContent = "게시글을 불러올 수 없습니다.";
    postDetail.appendChild(noPostMessage);
  }
}
