// This script will dynamically load subreddit data from an API.

document.addEventListener("DOMContentLoaded", function() {
    const subredditId = getSubredditIdFromUrl(); // You can extract this ID from the URL or route.
    getSubredditData(subredditId).then(subredditData => {
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
    }).catch(error => {
        console.error("Error fetching subreddit data:", error);
    });
});

// Dummy function to simulate getting the subreddit ID from the URL.
function getSubredditIdFromUrl() {
    // Here you'd extract the subreddit ID from the URL or route. For example:
    // const urlParts = window.location.pathname.split('/');
    // return urlParts[urlParts.length - 1];
    return 'exampleSubreddit';  // Change to your method of getting this.
}

// Function to fetch subreddit data from the API
async function getSubredditData(subredditId) {
    const apiUrl = `https://example.com/api/subreddits/${subredditId}`; // Replace with your actual API endpoint

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching subreddit data: ${response.statusText}`);
        }
        const subredditData = await response.json();
        return subredditData;
    } catch (error) {
        console.error("Failed to fetch subreddit data:", error);
        return {
            name: subredditId,
            description: "This subreddit is temporarily unavailable.",
            posts: []
        }; // Return default data if the fetch fails
    }
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
    
    // Prepare the post data
    const postData = {
        title: title,
        content: content,
        subreddit: getSubredditIdFromUrl(), // Get the subreddit ID from the URL
        author: "ExampleUser",  // This should be the logged-in user
        timeAgo: "Just Now"
    };

    // Send the data to Discord webhook for review
    sendToDiscord(postData);

    // Close the form and reset it
    closePostForm();
    alert("Your post has been submitted for review!");  // Show feedback to the user
}

// Send post data to Discord webhook for review
function sendToDiscord(postData) {
    const webhookUrl = "https://discord.com/api/webhooks/1336541813212975175/8YcdxjTvptCriGzxVhNMbKSoW6Ngm1dVL3rvHylvMajPK13MALHg49acGUlkvxRcoaEK";
    
    const embed = {
        title: `New Post Submitted: ${postData.title}`,
        description: postData.content,
        fields: [
            { name: "Subreddit", value: postData.subreddit, inline: true },
            { name: "Author", value: postData.author, inline: true },
            { name: "Time Ago", value: postData.timeAgo, inline: true }
        ],
        color: 5814783,  // Blue color for the embed
        footer: {
            text: "Post Review"
        }
    };

    const body = JSON.stringify({
        embeds: [embed]
    });

    fetch(webhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: body
    })
    .then(response => response.json())
    .then(data => {
        console.log("Successfully sent to Discord:", data);
    })
    .catch(error => {
        console.error("Error sending to Discord:", error);
    });
}
