// Webhook URL
const webhookURL = "https://l.webhook.party/hook/Kk1oUcvynJaw4Y2Wtfma2aq3qcmdW8GlINLpk9Y2YGd%2FREtNg8K%2Fa9w43X1Y1PHRNy7ilnfTCIiPaI1QpJwpWRGX5%2B6UxAeuCumWtV%2BLWRPram9aC3OJ1pwWahYNuQFA1%2BVcUKonw8ENJMYdDabbY7KikvbxHqVYUf92fZRoFOZ17Ip2ezTsYH0UdBwXcrDedtI3pFqXx1EuFSwHU%2FwVA3UV3gjPhe%2BGpn8LtYkgVl7yt3AbjkzC4Vo3dv16sdJOMm5khY2saOD11bafjjXtC2OyjHzF9Vuu1AQBFXK58FuDOnWriXVtvbhhWAnIoKDzSF9%2FbfIkiEg5fwfBfTI6a%2FsCX9%2FvaEM9hbSADjAWI24Z%2B%2BWSicl5HQKS8y5RmwWDN7VO%2B7VFFso%3D/q7eX9epxHNXDNsWU";

// Function to load and render data from the JSON files
function loadData() {
    fetch("/data/posts.json")
        .then(response => response.json())
        .then(data => {
            posts = data;
            updatePostList();
        });

    fetch("/data/subreddits.json")
        .then(response => response.json())
        .then(data => {
            subreddits = data;
            updateSubredditList();
        });

    fetch("/data/users.json")
        .then(response => response.json())
        .then(data => {
            users = data;
        });

    fetch("/data/comments.json")
        .then(response => response.json())
        .then(data => {
            comments = data;
        });
}

// Function to create a subreddit
function createSubreddit() {
    const name = document.getElementById("subredditName").value;
    if (name) {
        const subreddit = {
            id: Date.now(),
            name
        };
        sendToWebhook(subreddit, 'subreddit');
    }
}

// Function to create a post
function createPost() {
    const title = document.getElementById("postTitle").value;
    const content = document.getElementById("postContent").value;
    const subredditId = parseInt(document.getElementById("postSubreddit").value);

    if (title && content && subredditId) {
        const subreddit = subreddits.find(sub => sub.id === subredditId);
        if (subreddit) {
            const post = {
                id: Date.now(),
                title,
                content,
                subreddit: subreddit.id,
                user: 1
            };
            sendToWebhook(post, 'post');
        } else {
            alert("Subreddit not found.");
        }
    }
}

// Function to send post, subreddit, or comment to the webhook for review
function sendToWebhook(data, type) {
    const reviewData = {
        type, 
        content: data
    };

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(`${type} sent for review`, data);
        if (data.approved) {
            if (type === 'post') {
                updatePostList();
            } else if (type === 'subreddit') {
                updateSubredditList();
            }
        } else {
            alert(`${type.charAt(0).toUpperCase() + type.slice(1)} denied!`);
        }
    })
    .catch(error => console.error("Error sending data to webhook:", error));
}

// Function to update subreddit list in the UI
function updateSubredditList() {
    const subredditListDiv = document.getElementById("subreddits");
    subredditListDiv.innerHTML = "<h2>Subreddits</h2>";
    subreddits.forEach((subreddit) => {
        const div = document.createElement("div");
        div.classList.add("subreddit-item");
        div.textContent = subreddit.name;
        subredditListDiv.appendChild(div);
    });
}

// Function to open the post form
function openPostForm() {
    document.getElementById("postForm").style.display = "block";
}

// Function to close the post form
function closePostForm() {
    document.getElementById("postForm").style.display = "none";
}

// Function to update post list in the UI with random posts
function updatePostList() {
    const postListDiv = document.getElementById("posts");
    postListDiv.innerHTML = "<h2>Random Posts</h2>";
    const randomPosts = shuffle(posts).slice(0, 5);

    randomPosts.forEach((post) => {
        const div = document.createElement("div");
        div.classList.add("post-item");
        div.innerHTML = `
            <strong>${post.title}</strong><br>
            Posted in r/${getSubredditName(post.subreddit)} by ${getUserName(post.user)}<br>
            ${post.content}<br>
            <button onclick="openCommentForm(${post.id})">Comment</button>
        `;
        postListDiv.appendChild(div);
    });
}

// Function to get subreddit name by id
function getSubredditName(subredditId) {
    const subreddit = subreddits.find(sub => sub.id === subredditId);
    return subreddit ? subreddit.name : "Unknown";
}

// Function to get user name by id
function getUserName(userId) {
    const user = users.find(u => u.id === userId);
    return user ? user.username : "Anonymous";
}

// Function to shuffle posts (for random display)
function shuffle(array) {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

// Load data on page load
window.onload = loadData;
