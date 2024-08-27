document.getElementById("startPractice").addEventListener("click", function() {
    // Get the sentence entered by the user
    const sentence = document.getElementById("sentenceInput").value;
    
    if (sentence.trim() !== "") {
        // Display the sentence for practice
        document.getElementById("displaySentence").textContent = sentence;

        // Enable the typing area
        const typingArea = document.getElementById("typingArea");
        typingArea.disabled = false;
        typingArea.value = '';
        typingArea.focus();

        // Reset score
        document.getElementById("score").textContent = '0 / 0 (0.00%)';

        // Clear previous event listeners
        typingArea.removeEventListener("input", handleTyping);

        // Handle typing
        typingArea.addEventListener("input", handleTyping);
    }
});

function handleTyping() {
    const sentence = document.getElementById("displaySentence").textContent;
    const typedText = this.value;

    let correctKeystrokes = 0;
    let totalKeystrokes = typedText.length;
    let colorfulText = '';

    for (let i = 0; i < sentence.length; i++) {
        const correctChar = sentence[i];
        const typedChar = typedText[i];

        if (typedChar === correctChar) {
            // Correct keystroke: color green and count as correct
            colorfulText += `<span style="color: green">${correctChar}</span>`;
            correctKeystrokes++;
        } else if (typedChar !== undefined) {
            // Incorrect keystroke: color red
            colorfulText += `<span style="color: red">${correctChar}</span>`;
        } else {
            // Untyped character: display as gray
            colorfulText += `<span style="color: gray">${correctChar}</span>`;
        }
    }

    // Calculate the percentage of correct keystrokes
    const accuracy = (totalKeystrokes > 0) ? (correctKeystrokes / totalKeystrokes) * 100 : 0;

    // Update the displayed sentence and score
    document.getElementById("displaySentence").innerHTML = colorfulText;
    document.getElementById("score").textContent = `${correctKeystrokes} / ${totalKeystrokes} (${accuracy.toFixed(2)}%)`;
}
