document.addEventListener('DOMContentLoaded', fetchRedditPosts);

function fetchRedditPosts() {
    // Updated API URL to fetch top posts from the current month
    const apiUrl = 'https://www.reddit.com/r/Wallstreetbets/top.json?limit=10&t=month';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('posts-container');
            postsContainer.innerHTML = ''; // Clear the loading text

            data.data.children.forEach(post => {
                const postData = post.data;

                // Skip posts with deleted content
                if (postData.title === '[deleted]' || postData.author === '[deleted]') {
                    return;
                }

                // Create HTML elements to display the post information
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                const postTitle = document.createElement('a');
                postTitle.classList.add('post-title');
                postTitle.href = `https://www.reddit.com${postData.permalink}`;
                postTitle.target = '_blank';
                postTitle.textContent = postData.title;

                const postAuthor = document.createElement('p');
                postAuthor.classList.add('post-author');
                postAuthor.textContent = `Posted by: ${postData.author !== '[deleted]' ? postData.author : 'Author Unavailable'}`;

                const postInfo = document.createElement('p');
                postInfo.classList.add('post-info');
                postInfo.textContent = `Score: ${postData.score} | Comments: ${postData.num_comments}`;

                // Append elements to the post container
                postElement.appendChild(postTitle);
                postElement.appendChild(postAuthor);
                postElement.appendChild(postInfo);

                // Append the post to the main posts container
                postsContainer.appendChild(postElement);
            });
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
            document.getElementById('posts-container').innerHTML = 'Failed to load posts. Please try again later.';
        });
}
