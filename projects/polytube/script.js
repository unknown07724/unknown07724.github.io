// Sample video data
const videos = [
    {
        thumbnail: 'https://placekitten.com/300/180', // Using PlaceKitten for the thumbnail
        title: 'Amazing Nature',
        creator: 'John Doe',
        views: '1M',
        likes: '200K'
    },
    {
        thumbnail: 'https://placekitten.com/300/181',
        title: 'why imperius is the best tribe',
        creator: 'polytopiati - in a polygon',
        views: '500K',
        likes: '100K'
    },
    {
        thumbnail: 'https://placekitten.com/300/182',
        title: 'Best Cooking Tips',
        creator: 'Chef Mario',
        views: '300K',
        likes: '50K'
    },
    {
        thumbnail: 'https://placekitten.com/300/183',
        title: 'Travel Vlog: Paris',
        creator: 'Adventurer',
        views: '2M',
        likes: '500K'
    }
];

// Function to display videos
function displayVideos() {
    const videoContainer = document.getElementById('videoContainer');
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card');

        videoCard.innerHTML = `
            <div class="thumbnail" style="background-image: url('${video.thumbnail}');"></div>
            <div class="video-details">
                <div class="video-title">${video.title}</div>
                <div class="video-creator">by ${video.creator}</div>
                <div class="video-stats">${video.views} views • ${video.likes} likes</div>
            </div>
        `;

        videoContainer.appendChild(videoCard);
    });
}

// Use DOMContentLoaded to make sure DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', displayVideos);

