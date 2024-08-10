// Define word lists for different subjects
const wordLists = {
    
    insults: ["Yo mama so stupid she thought a quarter back was a refund", "I AM GONNA BREAK YOUR FEMUR BONE!!", "You have got to be the dumbest test subject weve ever had...", "knock knock, whos there?, THIS IS THE FBI NOW OPEN THE DOOR NOW BEFORE I DETONATE YOUR UGLY HOME WITH NUCLEAR WARHEADS!!"],
    comebacks: ["I know you are but what am I?", "It takes one to know one!", "NOBODY ASKED LOL"],
        // Add more subjects and words as needed
};

// Function to generate
function generateWord() {
    const subject = document.getElementById("subject").value;
    const words = wordLists[subject];
    if (words) {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        document.getElementById("result").textContent = randomWord;
    } else {
        document.getElementById("result").textContent = "Nothing is available for this subject.";
    }
}
