const btn = document.querySelector("#js-new-quote"); 
btn.addEventListener('click', getQuote);

const answerbtn = document.querySelector("#js-tweet");
answerbtn.addEventListener('click', getAnswer);

const answerText = document.querySelector("#js-answer-text");

const endpoint = 'https://api.quotable.io/random';

let answer = '';

async function getQuote() {
    // console.log("Test")
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText)
        }

        const json = await response.json();
        console.log(json['content']);
        displayQuote(json['content']);
        console.log(json['author']);
        answer = json['author'];
        answerText.textContent = '';
        
    } catch (err) {
        console.log(err);
        alert ('Failed to fetch new quote');
    }
}

function displayQuote (quote) {
    const quoteText = document.querySelector ("#js-quote-text");
    quoteText.textContent = quote;
}

function getAnswer() {
    answerText.textContent = answer;
}

getQuote();




