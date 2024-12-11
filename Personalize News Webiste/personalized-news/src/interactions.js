// Interactions Module

// Save a liked article
function likeArticle(articleId) {
    try {
        const likedArticles = JSON.parse(localStorage.getItem("likedArticles")) || [];
        if (!likedArticles.includes(articleId)) {
            likedArticles.push(articleId); // Add article ID to the liked list
            localStorage.setItem("likedArticles", JSON.stringify(likedArticles));
            console.log(`Article ${articleId} liked successfully!`);
        } else {
            console.log(`Article ${articleId} is already liked.`);
        }
    } catch (error) {
        console.error("Error liking article:", error);
    }
}

// Save an article for later
function saveArticle(article) {
    try {
        const savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];
        // Check if article is already saved by matching its ID
        if (!savedArticles.some(saved => saved.id === article.id)) {
            savedArticles.push(article); // Add the full article object
            localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
            console.log(`Article ${article.id} saved successfully!`);
        } else {
            console.log(`Article ${article.id} is already saved.`);
        }
    } catch (error) {
        console.error("Error saving article:", error);
    }
}

// Retrieve all liked articles
function getLikedArticles() {
    try {
        return JSON.parse(localStorage.getItem("likedArticles")) || [];
    } catch (error) {
        console.error("Error retrieving liked articles:", error);
        return [];
    }
}

// Retrieve all saved articles
function getSavedArticles() {
    try {
        return JSON.parse(localStorage.getItem("savedArticles")) || [];
    } catch (error) {
        console.error("Error retrieving saved articles:", error);
        return [];
    }
}

// Example Usage
// Like an article
likeArticle("article123");

// Save an article for later
saveArticle({
    id: "article123",
    title: "Breaking News: Major Event Happens",
    url: "https://example.com/article123",
    description: "This is a brief description of the article.",
});

// Get liked articles
const liked = getLikedArticles();
console.log("Liked Articles:", liked);

// Get saved articles
const saved = getSavedArticles();
console.log("Saved Articles:", saved);
