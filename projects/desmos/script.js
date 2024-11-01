document.getElementById("loginButton").addEventListener("click", async () => {
    const token = document.getElementById("tokenInput").value;
    localStorage.setItem("discordToken", token);
    console.log("Logged in with token:", token);
    // Here, you would typically fetch user and server data.
});

async function fetchChannels(guildId) {
    const token = localStorage.getItem("discordToken");
    const response = await fetch(`https://discord.com/api/v9/guilds/${guildId}/channels`, {
        headers: {
            "Authorization": token
        }
    });
    if (response.ok) {
        const channels = await response.json();
        const inviteChannelSelect = document.getElementById("inviteChannel");
        const forwardChannelSelect = document.getElementById("forwardChannelSelect");
        
        channels.forEach(channel => {
            if (channel.type === 0) {  // Only include text channels
                const inviteOption = document.createElement("option");
                inviteOption.value = channel.id;
                inviteOption.textContent = channel.name;
                inviteChannelSelect.appendChild(inviteOption);

                const forwardOption = document.createElement("option");
                forwardOption.value = channel.id;
                forwardOption.textContent = channel.name;
                forwardChannelSelect.appendChild(forwardOption);
            }
        });
    } else {
        console.error("Failed to fetch channels:", response.status);
    }
}

async function generateInvite(channelId) {
    const token = localStorage.getItem("discordToken");
    const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/invites`, {
        method: "POST",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            max_age: 86400,  // Invite expires in 24 hours
            max_uses: 5      // Limit the invite to 5 uses
        })
    });
    if (response.ok) {
        const inviteData = await response.json();
        const inviteLink = `https://discord.gg/${inviteData.code}`;
        document.getElementById("inviteLinkDisplay").textContent = `Invite Link: ${inviteLink}`;
    } else {
        console.error("Failed to create invite:", response.status);
    }
}

document.getElementById("createInviteButton").addEventListener("click", () => {
    const channelId = document.getElementById("inviteChannel").value;
    generateInvite(channelId);
});

function generateBotInvite() {
    const botId = document.getElementById("botIdInput").value;
    const permissions = 8;  // Full administrator permissions; customize as needed
    const botInviteLink = `https://discord.com/oauth2/authorize?client_id=${botId}&scope=bot&permissions=${permissions}`;
    document.getElementById("botInviteLinkDisplay").textContent = `Bot Invite Link: ${botInviteLink}`;
}

document.getElementById("addBotButton").addEventListener("click", generateBotInvite);

async function reactToMessage(channelId, messageId, emoji) {
    const token = localStorage.getItem("discordToken");
    const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}/reactions/${encodeURIComponent(emoji)}/%40me`, {
        method: "PUT",
        headers: {
            "Authorization": token
        }
    });
    if (response.ok) {
        console.log("Reaction added successfully");
    } else {
        console.error("Failed to add reaction:", response.status);
    }
}

document.getElementById("reactToMessageButton").addEventListener("click", () => {
    const messageId = document.getElementById("messageIdInput").value;
    const emoji = "👍"; // You can make this dynamic if needed
    const channelId = selectedChannelId; // Assume this is set when selecting a channel
    reactToMessage(channelId, messageId, emoji);
});

async function deleteMessage(channelId, messageId) {
    const token = localStorage.getItem("discordToken");
    const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}`, {
        method: "DELETE",
        headers: {
            "Authorization": token
        }
    });
    if (response.ok) {
        console.log("Message deleted successfully");
    } else {
        console.error("Failed to delete message:", response.status);
    }
}

document.getElementById("deleteMessageButton").addEventListener("click", () => {
    const messageId = document.getElementById("messageIdInput").value;
    const channelId = selectedChannelId; // Assume this is set when selecting a channel
    deleteMessage(channelId, messageId);
});

async function editMessage(channelId, messageId, newContent) {
    const token = localStorage.getItem("discordToken");
    const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}`, {
        method: "PATCH",
        headers: {
            "Authorization": token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: newContent })
    });
    if (response.ok) {
        console.log("Message edited successfully");
    } else {
        console.error("Failed to edit message:", response.status);
    }
}

document.getElementById("submitEditButton").addEventListener("click", () => {
    const messageId = document.getElementById("messageIdInput").value;
    const newContent = document.getElementById("editMessageInput").value;
    const channelId = selectedChannelId; // Assume this is set when selecting a channel
    editMessage(channelId, messageId, newContent);
});

async function forwardMessage(channelId, messageId, forwardChannelId) {
    const token = localStorage.getItem("discordToken");
    const fetchResponse = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}`, {
        headers: {
            "Authorization": token
        }
    });
    if (fetchResponse.ok) {
        const messageData = await fetchResponse.json();
        const response = await fetch(`https://discord.com/api/v9/channels/${forwardChannelId}/messages`, {
            method: "POST",
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: messageData.content })
        });
        if (response.ok) {
            console.log("Message forwarded successfully");
        } else {
            console.error("Failed to forward message:", response.status);
        }
    } else {
        console.error("Failed to fetch original message:", fetchResponse.status);
    }
}

document.getElementById("forwardMessageButton").addEventListener("click", () => {
    const messageId = document.getElementById("messageIdInput").value;
    const forwardChannelId = document.getElementById("forwardChannelSelect").value;
    const channelId = selectedChannelId; // Assume this is set when selecting a channel
    forwardMessage(channelId, messageId, forwardChannelId);
});

// Example for fetching channels on login (after user logs in)
async function loadUserData() {
    const token = localStorage.getItem("discordToken");
    // Here, you would typically fetch user and guild data.
    // Example: Fetching user's guilds
    const guildsResponse = await fetch(`https://discord.com/api/v9/users/@me/guilds`, {
        headers: {
            "Authorization": token
        }
    });
    if (guildsResponse.ok) {
        const guilds = await guildsResponse.json();
        guilds.forEach(guild => {
            console.log("Guild:", guild.name);
            fetchChannels(guild.id);
        });
    } else {
        console.error("Failed to fetch guilds:", guildsResponse.status);
    }
}
