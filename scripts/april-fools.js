document.addEventListener("DOMContentLoaded", () => {
    let today = new Date();
    
    // Only activate on April 1st
    if (today.getMonth() === 3 && today.getDate() === 1) {  
        
        console.log("April Fools' Mode Activated!");

        // 404 Glitch (30% chance)
        document.body.addEventListener("click", (event) => {
            if (event.target.tagName === "A" && Math.random() < 0.3) {
                event.preventDefault();
                
                let fake404 = document.createElement("div");
                fake404.innerHTML = `<h1>404 - Page Not Found</h1><p>Just kidding...</p>`;
                Object.assign(fake404.style, {
                    position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh",
                    background: "#000", color: "#fff", display: "flex", flexDirection: "column",
                    justifyContent: "center", alignItems: "center", fontSize: "2em", zIndex: "9999"
                });
                document.body.appendChild(fake404);

                setTimeout(() => {
                    fake404.remove();
                    window.location.href = event.target.href;
                }, 2000);
            }
        });

        // Link Dodge (Links move away from the cursor)
        document.querySelectorAll("a").forEach(link => {
            link.addEventListener("mousemove", (event) => {
                let offsetX = (Math.random() * 100 - 50) + "px";
                let offsetY = (Math.random() * 100 - 50) + "px";
                link.style.transform = `translate(${offsetX}, ${offsetY})`;
                link.style.transition = "transform 0.2s ease-out";
            });
        });

        // Reverse Typing (Reverses whatever is typed in text inputs)
        document.querySelectorAll("input[type='text'], textarea").forEach(input => {
            input.addEventListener("input", () => {
                input.value = input.value.split("").reverse().join("");
            });
        });

        // Random Rotation (Elements rotate slightly when hovered)
        document.querySelectorAll("p, div, img, button, h1, h2, h3, h4, h5, h6").forEach(element => {
            element.addEventListener("mouseenter", () => {
                element.style.transform = `rotate(${Math.random() * 20 - 10}deg)`;
                element.style.transition = "transform 0.2s ease";
            });
        });

        // Fake Scroll (Scrolls in the opposite direction sometimes)
        window.addEventListener("wheel", (event) => {
            if (Math.random() < 0.3) {  // 30% chance
                event.preventDefault();
                window.scrollBy(0, -event.deltaY);
            }
        }, { passive: false });

        // Cursor Chaos (Random cursor styles every 3 seconds)
        const cursors = ["crosshair", "wait", "help", "not-allowed", "none", "pointer"];
        setInterval(() => {
            document.body.style.cursor = cursors[Math.floor(Math.random() * cursors.length)];
        }, 3000);

        // Upside Down Mode (Flips the whole site randomly)
        if (Math.random() < 0.5) {
            document.body.style.transform = "rotate(180deg)";
            document.body.style.transition = "transform 1s ease";
        }

        // Blurry Mode (Random elements get blurry when hovered)
        document.querySelectorAll("p, img, div, a, button").forEach(element => {
            element.addEventListener("mouseenter", () => {
                element.style.filter = "blur(3px)";
                setTimeout(() => element.style.filter = "none", 1000);
            });
        });

        // Fake Virus Warning (Random pop-up)
        setTimeout(() => {
            alert("🚨 WARNING: Your PC has a virus! Just kidding. Happy April Fools! 😂");
        }, Math.random() * 15000 + 5000);

        // Fake Loading Screen
        setTimeout(() => {
            let loadingScreen = document.createElement("div");
            loadingScreen.innerHTML = `<h1>Loading...</h1>`;
            Object.assign(loadingScreen.style, {
                position: "fixed", top: "0", left: "0", width: "100vw", height: "100vh",
                background: "#000", color: "#fff", display: "flex", flexDirection: "column",
                justifyContent: "center", alignItems: "center", fontSize: "2em", zIndex: "9999"
            });
            document.body.appendChild(loadingScreen);

            setTimeout(() => {
                loadingScreen.remove();
            }, 3000);
        }, Math.random() * 20000 + 10000);

        // Jumping Frogs
        function spawnFrog() {
            let frog = document.createElement("img");
            frog.src = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Frog_icon.png";
            frog.style.position = "fixed";
            frog.style.left = Math.random() * window.innerWidth + "px";
            frog.style.top = Math.random() * window.innerHeight + "px";
            frog.style.width = "50px";
            frog.style.height = "50px";
            frog.style.transition = "top 0.5s ease, left 0.5s ease";
            document.body.appendChild(frog);

            setInterval(() => {
                frog.style.left = Math.random() * window.innerWidth + "px";
                frog.style.top = Math.random() * window.innerHeight + "px";
            }, 1000);

            setTimeout(() => {
                frog.remove();
            }, 10000);
        }

        setInterval(spawnFrog, 3000);

        // **Screen Shake**
        function shakeScreen() {
            let intensity = 5;
            let x = (Math.random() * intensity) - (intensity / 2);
            let y = (Math.random() * intensity) - (intensity / 2);
            document.body.style.transform = `translate(${x}px, ${y}px)`;
            setTimeout(() => {
                document.body.style.transform = "translate(0, 0)";
            }, 100);
        }
        setInterval(shakeScreen, 5000);

        // **Random Ribbit Mode**
        function ribbitText() {
            let elements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, a, span, div");
            elements.forEach(element => {
                if (Math.random() < 0.1) { // 10% chance
                    element.innerText = "Ribbit";
                }
            });
        }
        setInterval(ribbitText, 3000);

        // **Annoying Sound Effects**
        function playRandomSound() {
            let sounds = [
                "https://www.fesliyanstudios.com/play-mp3/387", // Random beep
                "https://www.fesliyanstudios.com/play-mp3/388", // Croak
                "https://www.fesliyanstudios.com/play-mp3/389"  // Glitch noise
            ];
            let audio = new Audio(sounds[Math.floor(Math.random() * sounds.length)]);
            audio.volume = 0.5;
            audio.play();
        }
        setInterval(playRandomSound, 8000);
    } else {
        console.log("Normal mode, no pranks today.");
    }
});
