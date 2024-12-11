// Display Module

// Render a single article
function renderArticle(article, isLiked, isSaved) {
    const articleContainer = document.createElement("div");
    articleContainer.classList.add("article-item");

    // Article HTML structure
    articleContainer.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read More</a>
        <div class="article-actions">
            <button class="like-button ${isLiked ? "liked" : ""}" data-id="${article.id}">
                ${isLiked ? "Liked" : "Like"}
            </button>
            <button class="save-button ${isSaved ? "saved" : ""}" data-id="${article.id}">
                ${isSaved ? "Saved" : "Save for Later"}
            </button>
        </div>
    `;
    return articleContainer;
}

// Render a batch of articles
function renderArticles(articles, container, category) {
    const categorySection = document.createElement("section");
    const categoryHeader = document.createElement("h2");
    categoryHeader.innerText = `News for ${category}`;
    categorySection.appendChild(categoryHeader);

    articles.forEach(article => {
        const articleDiv = document.createElement("div");
        articleDiv.classList.add("article");

        const articleTitle = document.createElement("h3");
        articleTitle.innerText = article.title;

        const articleDescription = document.createElement("p");
        articleDescription.innerText = article.description;

        const articleLink = document.createElement("a");
        articleLink.href = article.url;
        articleLink.target = "_blank";
        articleLink.innerText = "Read more";

        articleDiv.appendChild(articleTitle);
        articleDiv.appendChild(articleDescription);
        articleDiv.appendChild(articleLink);
        categorySection.appendChild(articleDiv);
    });

    container.appendChild(categorySection);
}


// Attach event listeners for "like" and "save" buttons
function attachArticleActions() {
    const likeButtons = document.querySelectorAll(".like-button");
    const saveButtons = document.querySelectorAll(".save-button");

    // Handle Like Button
    likeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const articleId = button.getAttribute("data-id");
            likeArticle(articleId); // From interactions.js
            button.classList.add("liked");
            button.textContent = "Liked";
        });
    });

    // Handle Save Button
    saveButtons.forEach(button => {
        button.addEventListener("click", () => {
            const articleId = button.getAttribute("data-id");
            const articleElement = button.closest(".article-item");
            const article = {
                id: articleId,
                title: articleElement.querySelector("h3").textContent,
                url: articleElement.querySelector("a").href,
                description: articleElement.querySelector("p").textContent,
            };
            saveArticle(article); // From interactions.js
            button.classList.add("saved");
            button.textContent = "Saved";
        });
    });
}

// Staged Loading
let currentPage = 1;
const articlesPerPage = 5;

// Load a batch of articles
function loadArticles(articles) {
    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;

    const articlesToRender = articles.slice(start, end);
    renderArticles(articlesToRender);

    // Show "Load More" button if there are more articles
    const loadMoreButton = document.getElementById("load-more");
    if (end < articles.length) {
        loadMoreButton.style.display = "block";
        loadMoreButton.onclick = () => {
            currentPage++;
            loadArticles(articles);
        };
    } else {
        loadMoreButton.style.display = "none";
    }
}

// Example Usage
// Fetch and display articles for a category
async function displayCategoryNews(category) {
    const articles = await fetchNewsByCategory(category); // From api.js
    if (articles.length > 0) {
        loadArticles(articles); // Handle staged loading
    } else {
        document.getElementById("news-feed").innerHTML = "<p>No articles found for this category.</p>";
    }
}
