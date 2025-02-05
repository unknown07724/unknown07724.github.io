document.addEventListener("DOMContentLoaded", function() {
    const subredditId = getSubredditIdFromUrl();
    
    if (!subredditId) {
        document.getElementById("subreddit-name").textContent = "Invalid Subreddit";
        return;
    }

    getSubredditData(subredditId).then(subredditData => {
        document.getElementById("page-title").textContent = `r/${subredditData.name}`;
        document.getElementById("subreddit-name").textContent = `r/${subredditData.name}`;
        document.getElementById("subreddit-description").textContent = subredditData.description;

        loadSubredditPosts(subredditId);
    }).catch(error => {
        console.error("Error fetching subreddit data:", error);
    });
});

// Extracts subreddit ID from the URL hash
function getSubredditIdFromUrl() {
    return window.location.hash.substring(1); // Removes '#' and gets the subreddit ID
}

// Fetches subreddit info from JSON
async function getSubredditData(subredditId) {
    try {
        const response = await fetch("data/subreddits.json");
        if (!response.ok) throw new Error("Failed to load subreddit data");

        const subreddits = await response.json();
        return subreddits.find(sub => sub.id === subredditId) || {
            name: "Unknown",
            description: "Subreddit not found"
        };
    } catch (error) {
        console.error("Error:", error);
        return { name: "Error", description: "Failed to load subreddit" };
    }
}

// Loads posts for the subreddit from posts.json
async function loadSubredditPosts(subredditId) {
    try {
        const response = await fetch("posts.json");
        if (!response.ok) throw new Error("Failed to load posts");

        const posts = await response.json();
        const filteredPosts = posts.filter(post => post.subreddit_id === subredditId);

        const postList = document.getElementById("post-list");
        postList.innerHTML = ""; // Clear old posts

        if (filteredPosts.length === 0) {
            postList.innerHTML = "<p>No posts yet.</p>";
            return;
        }

        filteredPosts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post-item");
            postElement.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.content}</p>
                <div class="post-meta">
                    <span>Posted by <a href="/user/${post.author}">${post.author}</a></span>
                </div>
            `;
            postList.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}
