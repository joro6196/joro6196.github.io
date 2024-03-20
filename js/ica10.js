const button1 = document.querySelector("button.button1");
button1.addEventListener('click', colorGuess);

function colorGuess() {
    const name = prompt("Click to Guess a Color")
    button1.textContent = `Guess: ${name}`;
}

const button2 = document.querySelector("button.button2");
button2.addEventListener('mouseover',colorReveal);

function colorReveal() {
    button2.style.background='#008000';
    button2.textContent = `Answer: Green!`;
}





