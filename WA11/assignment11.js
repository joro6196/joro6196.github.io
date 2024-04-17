const btn = document.querySelector("#js-new-quote");
btn.addEventListener('click', getQuote);

const tweetButton = document.querySelector("#js-tweet");

const answerText = document.querySelector("#js-answer-text"); //twitter

const endpoint = 'https://api.quotable.io/random';

let answer = '';

async function getQuote() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText)
        }

        const json = await response.json();
        displayQuote(json['content']);
        answer = json['author'];
        answerText.textContent = '';
        updateTweetButton(json['content'], json['author']);
    } catch (err) {
        console.log(err);
        alert('Failed to fetch new quote');
    }
}

function displayQuote(quote) {
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;
}

function updateTweetButton(quote, author) {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} ~ ${author}`;
    tweetButton.href = tweetUrl;
}

getQuote();
