document.addEventListener("DOMContentLoaded", () => {
    fetch("skins.json")
        .then(response => response.json())
        .then(skins => {
            const skinList = document.getElementById("skinList");

            skins.forEach(skin => {
                const skinCard = document.createElement("div");
                skinCard.classList.add("skin-card");

                skinCard.innerHTML = `
                    <h3>${skin.name}</h3>
                    <img src="${skin.preview}" alt="${skin.name} Preview">
                    <div class="skin-info">By ${skin.author} - ${skin.date}</div>
                    <a href="${skin.file}" download class="download-btn">Download Skin</a>
                `;

                skinList.appendChild(skinCard);
            });
        })
        .catch(error => console.error("Error loading skins:", error));
});
