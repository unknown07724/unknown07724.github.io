// This script will dynamically load subreddit data from the JSON or from a server if needed.

document.addEventListener("DOMContentLoaded", function() {
    const subredditId = getSubredditIdFromUrl(); // You can extract this ID from the URL or route.
    const subredditData = getSubredditData(subredditId); // You would get this data from your JSON.

    // Update page title dynamically based on subreddit name
    document.getElementById("page-title").textContent = `r/${subredditData.name}`;
    
    // Update subreddit info (name, description)
    document.getElementById("subreddit-name").textContent = `r/${subredditData.name}`;
    document.getElementById("subreddit-description").textContent = subredditData.description;

    // Dynamically load posts
    const postList = document.getElementById("post-list");
    subredditData.posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post-item");
        postElement.innerHTML = `
            <h4>${post.title}</h4>
            <p>${post.content}</p>
            <div class="post-meta">
                <span>Posted by <a href="/user/${post.author}">${post.author}</a> • ${post.timeAgo}</span>
                <button onclick="openCommentForm()">Comment</button>
            </div>
        `;
        postList.appendChild(postElement);
    });
});

// Dummy function to simulate getting the subreddit ID from the URL.
function getSubredditIdFromUrl() {
    // Here you'd extract the subreddit ID from the URL or route. For example:
    // const urlParts = window.location.pathname.split('/');
    // return urlParts[urlParts.length - 1];
    return 'exampleSubreddit';  // Change to your method of getting this.
}

// Dummy function to simulate getting subreddit data.
function getSubredditData(subredditId) {
    // You would fetch this from your JSON or backend.
    return {
        name: subredditId,
        description: "This is an example subreddit to discuss various topics.",
        posts: [
            {
                title: "Example Post 1",
                content: "This is the content of the first example post.",
                author: "ExampleUser1",
                timeAgo: "5 hours ago"
            },
            {
                title: "Example Post 2",
                content: "This is the content of the second example post.",
                author: "ExampleUser2",
                timeAgo: "12 hours ago"
            }
        ]
    };
}

// Functions for opening and closing the post creation form
function openPostForm() {
    document.getElementById("postForm").style.display = "block";
}

function closePostForm() {
    document.getElementById("postForm").style.display = "none";
}

// Function to handle post creation
function createPost() {
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;
    
    // You would send this data to your Discord webhook for review and then add it to your JSON.
    console.log("New Post Created:", title, content);
    alert("Post created! (Review in Discord)");
    
    closePostForm();
}
