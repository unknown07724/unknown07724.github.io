document.addEventListener("DOMContentLoaded", function() {
    const subredditId = getSubredditIdFromUrl();
    
    if (!subredditId) {
        document.getElementById("subreddit-name").textContent = "Invalid Subreddit";
        return;
    }

    getSubredditData(subredditId).then(subredditData => {
        document.getElementById("page-title").textContent = `c/${subredditData.name}`;
        document.getElementById("subreddit-name").textContent = `c/${subredditData.name}`;
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
        const response = await fetch(`data/subreddits.json?t=${Date.now()}`);
        if (!response.ok) throw new Error("Failed to load community-box data");

        const subreddits = await response.json();
        return subreddits.find(sub => sub.id === subredditId) || {
            name: "Unknown",
            description: "Community box not found"
        };
    } catch (error) {
        console.error("Error:", error);
        return { name: "Error", description: "Failed to load community box" };
    }
}

// Loads posts for the subreddit from posts.json
async function loadSubredditPosts(subredditId) {
    try {
        const response = await fetch(`data/posts.json?t=${Date.now()}`);
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

            // Check if post has an image
            const imageHTML = post.image ? `<img src="${post.image}" alt="Post Image">` : "";

            postElement.innerHTML = `
                <div class="post-meta">
                    <span>Posted by <a href="user.html#${post.user}">${post.username}</a></span>
                    <p>Posted on ${post.posted}</p>
                </div>
                <h4>${post.title}</h4>
                <p>${post.content}</p>
                ${imageHTML}
            `;
            postList.appendChild(postElement);
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}
